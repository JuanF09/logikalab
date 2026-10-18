"use client";

import React, { useEffect, useRef } from "react";

interface Particle3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  color: string;
  glow: boolean;
  vx: number;
  vy: number;
  vz: number;
}

interface GeometricNode {
  x: number;
  y: number;
  z: number;
  size: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  speed: number;
}

export const HeroDigitalUniverse: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect user's accessibility preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Mouse coordinates in normalized space (-1 to 1)
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
    };

    // Camera perspective parameters
    const fov = 400;
    const center = { x: width / 2, y: height / 2 };

    // 1. Generate 3D Particle Cloud (Interconnected Neural Lattice)
    const particleCount = Math.min(110, Math.max(50, Math.floor((width * height) / 14000)));
    const particles: Particle3D[] = [];

    for (let i = 0; i < particleCount; i++) {
      const spreadX = width * 1.2;
      const spreadY = height * 1.1;
      const spreadZ = 600;

      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = Math.random() * spreadZ - 200;

      const isBlue = Math.random() > 0.35;
      const isWhite = Math.random() > 0.85;

      particles.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        size: Math.random() * 2.2 + 1.2,
        color: isWhite ? "#FFFFFF" : isBlue ? "#1154FF" : "#4A85FF",
        glow: isBlue || isWhite,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.4,
      });
    }

    // 2. Generate Floating Isometric Wireframe Cubes (Representing Modular Code & DB Units)
    const cubes: GeometricNode[] = [
      { x: -width * 0.32, y: -height * 0.15, z: 120, size: 55, rotX: 0.4, rotY: 0.5, rotZ: 0, speed: 0.008 },
      { x: width * 0.34, y: height * 0.18, z: 80, size: 48, rotX: 0.2, rotY: -0.3, rotZ: 0.1, speed: 0.006 },
      { x: width * 0.38, y: -height * 0.25, z: 220, size: 68, rotX: -0.5, rotY: 0.2, rotZ: 0.3, speed: 0.005 },
      { x: -width * 0.35, y: height * 0.22, z: 150, size: 42, rotX: 0.3, rotY: 0.6, rotZ: -0.2, speed: 0.007 },
    ];

    // Resize handler
    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      center.x = width / 2;
      center.y = height / 2;
    };

    // Mouse handlers with smooth interpolation
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX - center.x) / center.x;
      mouse.targetY = (clientY - center.y) / center.y;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Cube vertices in normalized unit coordinates
    const unitCubeVertices = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ];

    const cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // front face
      [4, 5], [5, 6], [6, 7], [7, 4], // back face
      [0, 4], [1, 5], [2, 6], [3, 7], // connecting edges
    ];

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.012;

      // Smooth camera tilt towards mouse
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Camera rotation angles based on mouse and time
      const angleY = mouse.x * 0.45;
      const angleX = -mouse.y * 0.35;
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Project 3D point to 2D screen coordinates
      const project = (px: number, py: number, pz: number) => {
        // Rotate around Y
        const x1 = px * cosY - pz * sinY;
        const z1 = px * sinY + pz * cosY;

        // Rotate around X
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX + 350;

        if (z2 <= 20) return null;

        const scale = fov / z2;
        const sx = center.x + x1 * scale;
        const sy = center.y + y2 * scale;

        return { sx, sy, scale, z: z2 };
      };

      // 1. Update and Project Particles
      interface ProjectedParticle {
        sx: number;
        sy: number;
        scale: number;
        z: number;
        particle: Particle3D;
      }
      const projected: ProjectedParticle[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;

          // Spatial boundary wrap
          const limitX = width * 0.7;
          const limitY = height * 0.65;
          if (p.x < -limitX) p.x = limitX;
          if (p.x > limitX) p.x = -limitX;
          if (p.y < -limitY) p.y = limitY;
          if (p.y > limitY) p.y = -limitY;
          if (p.z < -250) p.z = 400;
          if (p.z > 400) p.z = -250;
        }

        const proj = project(p.x, p.y, p.z);
        if (proj) {
          projected.push({ ...proj, particle: p });
        }
      }

      // 2. Draw Distance Connections Between Particles (Data Constellation)
      const maxDist = 135;
      for (let i = 0; i < projected.length; i++) {
        const pA = projected[i];

        for (let j = i + 1; j < projected.length; j++) {
          const pB = projected[j];

          const dx = pA.sx - pB.sx;
          const dy = pA.sy - pB.sy;
          const dist2D = Math.sqrt(dx * dx + dy * dy);

          if (dist2D < maxDist) {
            const alpha = (1 - dist2D / maxDist) * 0.38;
            const isBlueLink = pA.particle.glow || pB.particle.glow;

            ctx.beginPath();
            ctx.moveTo(pA.sx, pA.sy);
            ctx.lineTo(pB.sx, pB.sy);

            if (isBlueLink) {
              ctx.strokeStyle = `rgba(17, 84, 255, ${alpha * 1.3})`;
              ctx.lineWidth = 1.1;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
              ctx.lineWidth = 0.6;
            }
            ctx.stroke();
          }
        }
      }

      // 3. Draw Projected Particles
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const r = Math.max(0.8, p.particle.size * p.scale);
        const alpha = Math.min(1, Math.max(0.15, (500 - p.z) / 450));

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);

        if (p.particle.glow) {
          ctx.fillStyle = `rgba(17, 84, 255, ${alpha})`;
          ctx.shadowColor = "#1154FF";
          ctx.shadowBlur = 12 * p.scale;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.85})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Draw Floating 3D Wireframe Cubes (Systems Architecture Units)
      for (let c = 0; c < cubes.length; c++) {
        const cube = cubes[c];

        if (!prefersReducedMotion) {
          cube.rotX += cube.speed;
          cube.rotY += cube.speed * 1.3;
          cube.rotZ += cube.speed * 0.7;
        }

        const cosRx = Math.cos(cube.rotX);
        const sinRx = Math.sin(cube.rotX);
        const cosRy = Math.cos(cube.rotY);
        const sinRy = Math.sin(cube.rotY);
        const cosRz = Math.cos(cube.rotZ);
        const sinRz = Math.sin(cube.rotZ);

        // Transform and project all 8 vertices
        const projectedVertices: Array<{ sx: number; sy: number } | null> = [];

        for (let v = 0; v < unitCubeVertices.length; v++) {
          let [vx, vy, vz] = unitCubeVertices[v];
          vx *= cube.size;
          vy *= cube.size;
          vz *= cube.size;

          // Local 3D rotation
          const y1 = vy * cosRx - vz * sinRx;
          const z1 = vy * sinRx + vz * cosRx;

          const x2 = vx * cosRy + z1 * sinRy;
          const z2 = -vx * sinRy + z1 * cosRy;

          const x3 = x2 * cosRz - y1 * sinRz;
          const y3 = x2 * sinRz + y1 * cosRz;

          // World translation + subtle hovering motion
          const hoverY = Math.sin(time * 1.5 + c) * 12;
          const worldX = cube.x + x3;
          const worldY = cube.y + y3 + hoverY;
          const worldZ = cube.z + z2;

          const proj = project(worldX, worldY, worldZ);
          projectedVertices.push(proj ? { sx: proj.sx, sy: proj.sy } : null);
        }

        // Draw cube edges with electric blue glow
        ctx.save();
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = "rgba(17, 84, 255, 0.45)";
        ctx.shadowColor = "#1154FF";
        ctx.shadowBlur = 10;

        for (let e = 0; e < cubeEdges.length; e++) {
          const [idxA, idxB] = cubeEdges[e];
          const vA = projectedVertices[idxA];
          const vB = projectedVertices[idxB];

          if (vA && vB) {
            ctx.beginPath();
            ctx.moveTo(vA.sx, vA.sy);
            ctx.lineTo(vB.sx, vB.sy);
            ctx.stroke();
          }
        }
        ctx.restore();

        // Draw small glowing core inside each cube
        const coreProj = project(cube.x, cube.y + Math.sin(time * 1.5 + c) * 12, cube.z);
        if (coreProj) {
          ctx.beginPath();
          ctx.arc(coreProj.sx, coreProj.sy, 3.5 * coreProj.scale, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.shadowColor = "#1154FF";
          ctx.shadowBlur = 14;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full select-none"
      style={{ zIndex: 1 }}
    />
  );
};
