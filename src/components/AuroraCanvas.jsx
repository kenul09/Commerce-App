import { useEffect, useRef } from "react";

const AuroraCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const orbs = [
      { x: 0.15, y: 0.25, r: 0.50, color: "79,142,247",  speed: 0.00016 },
      { x: 0.82, y: 0.18, r: 0.44, color: "139,92,246",  speed: 0.00022 },
      { x: 0.50, y: 0.78, r: 0.48, color: "6,182,212",   speed: 0.00014 },
      { x: 0.88, y: 0.72, r: 0.36, color: "244,63,94",   speed: 0.00019 },
      { x: 0.28, y: 0.58, r: 0.40, color: "16,185,129",  speed: 0.00020 },
    ];

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orbs.forEach((orb, i) => {
        const cx = (orb.x + Math.sin(t * orb.speed * Math.PI * 2 + i * 1.1) * 0.20) * canvas.width;
        const cy = (orb.y + Math.cos(t * orb.speed * Math.PI * 2 + i * 1.4) * 0.16) * canvas.height;
        const r  = orb.r * Math.min(canvas.width, canvas.height);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0,   `rgba(${orb.color},0.22)`);
        g.addColorStop(0.4, `rgba(${orb.color},0.09)`);
        g.addColorStop(1,   `rgba(${orb.color},0)`);
        ctx.globalCompositeOperation = "screen";
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default AuroraCanvas;
