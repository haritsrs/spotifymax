"use client";

import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // Set canvas dimensions
    const handleResize = (): void => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create particles
    const particlesArray: Particle[] = [];
    const numberOfParticles: number = 50;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = this.getRandomColor();
      }
      
      getRandomColor(): string {
        const colors: string[] = ['#1DB954', '#1ED760', '#2EBD59', '#1aa34a', '#0f8a3a'];
        return colors[Math.floor(Math.random() * colors.length)] || '#1DB954';
      }
      
      update(): void {
        this.x += this.speedX;
        this.y += this.speedY;
        
        const width = canvas?.width || window.innerWidth;
        const height = canvas?.height || window.innerHeight;
        
        if (this.x > width) this.x = 0;
        else if (this.x < 0) this.x = width;
        
        if (this.y > height) this.y = 0;
        else if (this.y < 0) this.y = height;
      }
      
      draw(): void {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.3;
        ctx.fill();
      }
    }
    
    const init = (): void => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    const drawLines = (): void => {
      if (!ctx) return;
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
          const particleI = particlesArray[i];
          const particleJ = particlesArray[j];
          
          if (!particleI || !particleJ) continue;
          
          const dx = particleI.x - particleJ.x;
          const dy = particleI.y - particleJ.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particleI.color;
            ctx.lineWidth = 0.2;
            ctx.globalAlpha = 0.1 * (1 - distance / 100);
            ctx.moveTo(particleI.x, particleI.y);
            ctx.lineTo(particleJ.x, particleJ.y);
            ctx.stroke();
          }
        }
      }
    };
    
    const waveEffect = (time: number): void => {
      if (!ctx) return;
      const frequency = 0.001;
      const amplitude = 20;
      
      for (let x = 0; x < canvas.width; x += 5) {
        for (let y = 0; y < canvas.height; y += 30) {
          const waveX = Math.sin(x * frequency + time * 0.001) * amplitude;
          const waveY = Math.cos(y * frequency + time * 0.001) * amplitude;
          
          ctx.beginPath();
          ctx.arc(x + waveX, y + waveY, 0.5, 0, Math.PI * 2);
          ctx.fillStyle = '#1DB954';
          ctx.globalAlpha = 0.05;
          ctx.fill();
        }
      }
    };
    
    const animate = (timestamp: number): void => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw wave effect
      waveEffect(timestamp);
      
      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        const particle = particlesArray[i];
        if (particle) {
          particle.update();
          particle.draw();
        }
      }
      
      // Draw connecting lines
      drawLines();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    init();
    animate(0);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 opacity-40"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default AnimatedBackground;