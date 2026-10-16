"use client";
import { useEffect, useRef } from "react";

/** Layered atomized spray. The source follows the front and rear outlets in the original photograph. */
export function WaterSpray({
  reducedMotion,
  boosted = false,
}: {
  reducedMotion: boolean;
  boosted?: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const strength = useRef(1);
  useEffect(() => {
    strength.current = boosted ? 2.25 : 1;
  }, [boosted]);
  useEffect(() => {
    const surface = canvas.current;
    const ctx = surface?.getContext("2d");
    if (!surface || !ctx) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0,
      height = 0,
      visible = false,
      frame = 0,
      last = 0,
      phase = 0,
      power = 1;
    // Soft sprites use several overlapping densities, avoiding solid circular outlines.
    const mist = document.createElement("canvas");
    mist.width = mist.height = 128;
    const brush = mist.getContext("2d")!;
    for (let i = 0; i < 22; i++) {
      const x = 35 + Math.random() * 58,
        y = 35 + Math.random() * 58,
        r = 20 + Math.random() * 30;
      const g = brush.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(229,239,232,.1)");
      g.addColorStop(1, "rgba(229,239,232,0)");
      brush.fillStyle = g;
      brush.fillRect(x - r, y - r, r * 2, r * 2);
    }
    const droplets = Array.from({ length: 340 }, () => ({
      t: Math.random(),
      lane: Math.random() - 0.5,
      speed: 0.8 + Math.random() * 0.5,
      size: 0.3 + Math.random() * 0.9,
    }));
    const clouds = Array.from({ length: 45 }, () => ({
      t: Math.random(),
      lane: Math.random() - 0.5,
      size: 0.6 + Math.random() * 0.7,
    }));
    function draw(dt: number) {
      if (!ctx || !width || !height) return;
      power += (strength.current - power) * 0.035;
      phase += dt;
      ctx.clearRect(0, 0, width, height);
      const scale = Math.max(width / 1672, height / 941);
      const mobile = width < 541;
      const ox = Math.max(
        mobile ? width * 0.31 : 40,
        (width - 1672 * scale) * (mobile ? 0.63 : 0.58) + 265 * scale,
      );
      const oy = (height - 941 * scale) * 0.5 + 663 * scale;
      const length = Math.max(280, 500 * scale) * power;
      ctx.globalCompositeOperation = "screen";
      // Dense near-nozzle jet opens into a progressively wider turbulent fan.
      for (let j = 0; j < 8; j++) {
        const spread = (j - 3.5) * 2.2;
        const grad = ctx.createLinearGradient(ox, oy, ox - length, oy + 140);
        grad.addColorStop(0, "rgba(231,245,237,.3)");
        grad.addColorStop(0.35, "rgba(231,245,237,.11)");
        grad.addColorStop(1, "rgba(231,245,237,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.7 + j * 0.12;
        ctx.beginPath();
        ctx.moveTo(ox, oy + spread * 0.12);
        ctx.bezierCurveTo(
          ox - length * 0.25,
          oy - 22 + spread,
          ox - length * 0.72,
          oy + 20 + spread * 3,
          ox - length,
          oy + 170 + spread * 6,
        );
        ctx.stroke();
      }
      for (const c of clouds) {
        c.t = (c.t + dt * 0.25 * power) % 1;
        const t = c.t,
          size = (24 + 140 * t) * c.size;
        const x = ox - length * t,
          y =
            oy +
            140 * t * t +
            c.lane * 110 * t +
            Math.sin(phase * 1.8 + t * 8) * 9 * t;
        ctx.globalAlpha = Math.sin(t * Math.PI) * 0.42;
        ctx.drawImage(mist, x - size, y - size * 0.5, size * 2, size * 1.2);
      }
      ctx.globalAlpha = 1;
      for (const d of droplets) {
        d.t = (d.t + dt * d.speed * 0.7 * power) % 1;
        const t = d.t,
          x = ox - length * t,
          y = oy + d.lane * 105 * t * power + 160 * t * t;
        const a = Math.sin(t * Math.PI) * 0.58;
        ctx.strokeStyle = `rgba(231,246,238,${a})`;
        ctx.lineWidth = d.size;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 2 + 7 * (1 - t), y - 1 - 3 * t);
        ctx.stroke();
      }
      // Front bumper fan shares the photograph's cover geometry, including mobile crop.
      const imagePosition = width < 541 ? 0.63 : width < 901 ? 0.61 : 0.58;
      const frontX = (width - 1672 * scale) * imagePosition + 1245 * scale;
      const frontY = (height - 941 * scale) * 0.5 + 750 * scale;
      const reach = Math.min(width * 0.4, 320 * scale) * (0.7 + power * 0.3);
      for (let i = 0; i < droplets.length; i++) {
        const d = droplets[i];
        const t = (d.t + i * 0.017) % 1;
        const spread = d.lane * (65 + power * 30) * t;
        const x = frontX + reach * t;
        const y = frontY + spread + 100 * scale * t * t;
        ctx.globalAlpha = Math.min(0.88, (1 - t) * (0.28 + power * 0.22));
        ctx.strokeStyle = "#eef7f5";
        ctx.lineWidth = d.size * (0.65 + power * 0.35);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - (3 + power * 4) * (1 - t), y - 2 * t);
        ctx.stroke();
      }
      for (const c of clouds) {
        const t = c.t;
        const size = (10 + t * 65) * scale * (0.7 + power * 0.3);
        ctx.globalAlpha = Math.sin(t * Math.PI) * (0.2 + power * 0.18);
        ctx.drawImage(mist, frontX + reach * t - size,
          frontY + c.lane * 80 * t + 100 * scale * t * t - size * 0.4,
          size * 2, size);
      }
      // A low veil of settling water skims the wet ground, independently of the jet.
      for (let i = 0; i < 9; i++) {
        const t = (phase * 0.035 + i / 9) % 1;
        const size = width * (0.17 + (i % 3) * 0.035);
        ctx.globalAlpha = 0.1 * power * Math.sin(t * Math.PI);
        ctx.drawImage(
          mist,
          width * (1 - t) - size,
          height * 0.91 - size * 0.12,
          size * 2,
          size * 0.32,
        );
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    }
    function resize() {
      if (!surface || !ctx) return;
      const rect = surface.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      surface.width = width * dpr;
      surface.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    }
    function tick(now: number) {
      if (now - last > 32) {
        draw(Math.min((now - last) / 1000, 0.05));
        last = now;
      }
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      if (visible && !document.hidden && !reducedMotion && !query.matches) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else draw(0);
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const resizer = new ResizeObserver(resize);
    observer.observe(surface);
    resizer.observe(surface);
    query.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizer.disconnect();
      query.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [reducedMotion]);
  return <canvas ref={canvas} className="water-spray" aria-hidden="true" />;
}
