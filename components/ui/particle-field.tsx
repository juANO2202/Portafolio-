"use client";

import { useReducedMotion, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Objeto de partículas dibujado en un <canvas> 2D (sin librerías 3D). Cada forma es una nube de
 * puntos con tema de software: una ventana de interfaz, una red de nodos conectados y el símbolo
 * de código `</>`. Al cambiar el progreso del scroll, los puntos viajan con suavizado hacia la
 * siguiente forma. Oscila despacio y reacciona al cursor.
 * - Todo el estado vive en refs: React no renderiza nunca mientras se anima.
 * - Se pausa fuera de pantalla. Con movimiento reducido no hay bucle: solo se redibuja al cambiar de forma.
 */
const COUNT = 1500;

type Cloud = Float32Array;
type P3 = [number, number, number];
type Seg = [P3, P3];

/** Generador pseudoaleatorio con semilla: las formas son siempre idénticas entre cargas. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Reparte `count` puntos a lo largo de los segmentos, en proporción a su longitud. */
function sampleSegments(segs: Seg[], count: number, jitter: number, seed: number): Cloud {
  const rand = rng(seed);
  const lengths = segs.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]));
  const total = lengths.reduce((sum, l) => sum + l, 0);
  const out = new Float32Array(count * 3);
  let idx = 0;
  segs.forEach(([a, b], si) => {
    const n = si === segs.length - 1 ? count - idx : Math.round(((lengths[si] ?? 0) / total) * count);
    for (let k = 0; k < n && idx < count; k++, idx++) {
      const t = (k + rand() * 0.7) / Math.max(n, 1);
      out[idx * 3] = a[0] + (b[0] - a[0]) * t + (rand() - 0.5) * jitter;
      out[idx * 3 + 1] = a[1] + (b[1] - a[1]) * t + (rand() - 0.5) * jitter;
      out[idx * 3 + 2] = a[2] + (b[2] - a[2]) * t + (rand() - 0.5) * jitter;
    }
  });
  return out;
}

/** Polilínea 2D (en el plano z) a segmentos. */
function polyline(points: Array<[number, number]>, z: number): Seg[] {
  const segs: Seg[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i]!;
    const [x1, y1] = points[i + 1]!;
    segs.push([
      [x0, y0, z],
      [x1, y1, z],
    ]);
  }
  return segs;
}

function rect(x0: number, y0: number, x1: number, y1: number, z: number): Seg[] {
  return polyline(
    [
      [x0, y0],
      [x1, y0],
      [x1, y1],
      [x0, y1],
      [x0, y0],
    ],
    z,
  );
}

/** Ventana de interfaz: barra superior, menú lateral, texto y tarjetas, con un poco de profundidad. */
function interfaceWindow(): Cloud {
  const layer = (z: number): Seg[] => [
    ...rect(-1, -0.7, 1, 0.7, z),
    ...polyline([[-1, 0.44], [1, 0.44]], z), // barra superior
    ...polyline([[-0.52, 0.44], [-0.52, -0.7]], z), // menú lateral
    ...polyline([[-0.88, 0.24], [-0.66, 0.24]], z),
    ...polyline([[-0.88, 0.06], [-0.66, 0.06]], z),
    ...polyline([[-0.88, -0.12], [-0.66, -0.12]], z),
    ...polyline([[-0.38, 0.28], [0.34, 0.28]], z), // titular
    ...polyline([[-0.38, 0.14], [0.14, 0.14]], z), // texto
    ...rect(0.52, 0.12, 0.86, 0.32, z), // botón
    ...rect(-0.38, -0.08, -0.02, -0.56, z), // tarjetas
    ...rect(0.08, -0.08, 0.44, -0.56, z),
    ...rect(0.54, -0.08, 0.86, -0.56, z),
  ];
  return sampleSegments([...layer(0.1), ...layer(-0.1)], COUNT, 0.035, 11);
}

/**
 * Red de nodos: un nodo central, un anillo de ocho nodos conectados a él y entre sí, y un satélite
 * exterior por cada uno. Se lee como "todo está conectado" desde cualquier ángulo.
 */
function network(): Cloud {
  const hub: P3 = [0, 0, 0];
  const ring: P3[] = [];
  const outer: P3[] = [];
  const total = 8;
  for (let k = 0; k < total; k++) {
    const a = (k / total) * Math.PI * 2;
    const z = k % 2 === 0 ? 0.32 : -0.32;
    ring.push([Math.cos(a) * 0.72, Math.sin(a) * 0.62, z]);
    outer.push([Math.cos(a) * 1.02, Math.sin(a) * 0.9, z * 1.7]);
  }

  const edges: Seg[] = [];
  ring.forEach((node, k) => {
    edges.push([hub, node]); // centro a anillo
    edges.push([node, ring[(k + 1) % total]!]); // anillo
    edges.push([node, outer[k]!]); // anillo a satélite
  });

  // (posición, puntos, radio de la nube): el centro es el nodo más denso.
  const clusters: Array<[P3, number, number]> = [
    [hub, 110, 0.11],
    ...ring.map((p): [P3, number, number] => [p, 56, 0.085]),
    ...outer.map((p): [P3, number, number] => [p, 24, 0.06]),
  ];
  const nodePoints = clusters.reduce((sum, [, n]) => sum + n, 0);

  const rand = rng(23);
  const out = new Float32Array(COUNT * 3);
  out.set(sampleSegments(edges, COUNT - nodePoints, 0.02, 29));
  let idx = COUNT - nodePoints;
  for (const [[x, y, z], n, r] of clusters) {
    for (let k = 0; k < n; k++, idx++) {
      out[idx * 3] = x + (rand() - 0.5) * 2 * r;
      out[idx * 3 + 1] = y + (rand() - 0.5) * 2 * r;
      out[idx * 3 + 2] = z + (rand() - 0.5) * 2 * r;
    }
  }
  return out;
}

/** El símbolo de código `</>`, trazado con tres líneas paralelas para que tenga cuerpo. */
function codeGlyph(): Cloud {
  const strokes: Array<Array<[number, number]>> = [
    [[-0.36, 0.52], [-0.98, 0], [-0.36, -0.52]],
    [[0.22, 0.78], [-0.22, -0.78]],
    [[0.36, 0.52], [0.98, 0], [0.36, -0.52]],
  ];
  const segs: Seg[] = [];
  for (const z of [0.12, -0.12]) {
    for (const dx of [-0.045, 0, 0.045]) {
      for (const stroke of strokes) {
        segs.push(...polyline(stroke.map(([x, y]) => [x + dx, y] as [number, number]), z));
      }
    }
  }
  return sampleSegments(segs, COUNT, 0.03, 37);
}

// Orden de las escenas: interfaz (Claridad), red (Accesibilidad), código (Atención al detalle).
const SHAPES: Cloud[] = [interfaceWindow(), network(), codeGlyph()];
export const PARTICLE_SHAPES = SHAPES.length;

export function ParticleField({
  progress,
  className = "",
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const current = new Float32Array(SHAPES[0]!);
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let mouseX = 0;
    let mouseY = 0;
    let smoothX = 0;
    let smoothY = 0;
    const start = performance.now();
    let last = start;

    function shapeIndex() {
      return Math.min(SHAPES.length - 1, Math.max(0, Math.floor(progress.get() * SHAPES.length)));
    }

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(now: number) {
      if (!ctx) return;
      const target = SHAPES[shapeIndex()]!;
      // Suavizado en función del tiempo (no de los cuadros): igual de fluido a 60 o 120 Hz.
      const dt = Math.min(now - last, 250);
      last = now;
      const ease = reduce ? 1 : 1 - Math.exp(-dt / 140);
      for (let i = 0; i < current.length; i++) {
        current[i]! += (target[i]! - current[i]!) * ease;
      }

      smoothX += (mouseX - smoothX) * 0.06;
      smoothY += (mouseY - smoothY) * 0.06;
      // Oscila en vez de dar vueltas completas: las formas planas nunca quedan de canto.
      const angle = reduce ? 0.45 : Math.sin((now - start) * 0.00055) * 0.7 + smoothX * 0.5;
      const tilt = 0.12 + smoothY * 0.25;
      const cy = Math.cos(angle);
      const sy = Math.sin(angle);
      const cx = Math.cos(tilt);
      const sx = Math.sin(tilt);

      const scale = Math.min(width * 0.46, height * 0.62);
      const midX = width / 2;
      const midY = height / 2;
      const stride = width < 560 ? 2 : 1; // menos puntos en pantallas pequeñas

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#3ecf8e";
      for (let i = 0; i < COUNT; i += stride) {
        const x = current[i * 3]!;
        const y = current[i * 3 + 1]!;
        const z = current[i * 3 + 2]!;
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx;
        const z2 = y * sx + z1 * cx;
        const f = 2.8 / (2.8 - z2);
        ctx.globalAlpha = 0.35 + ((z2 + 1) / 2) * 0.65;
        const size = 1.3 + f * 1.1;
        ctx.fillRect(midX + x1 * f * scale - size / 2, midY + y2 * f * scale - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    }

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      if (visible) draw(now);
    }

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    io.observe(canvas);

    function onMove(e: PointerEvent) {
      if (!canvas || e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouseY = ((e.clientY - r.top) / r.height) * 2 - 1;
    }
    window.addEventListener("pointermove", onMove);

    let unsubscribe: (() => void) | undefined;
    if (reduce) {
      draw(performance.now());
      unsubscribe = progress.on("change", () => draw(performance.now()));
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      unsubscribe?.();
    };
  }, [progress, reduce]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`block size-full ${className}`} />;
}
