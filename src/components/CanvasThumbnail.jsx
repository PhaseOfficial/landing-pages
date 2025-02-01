// filepath: /e:/RCSLandings/landing_pages/src/components/CanvasThumbnail.jsx
import React, { useEffect, useRef } from 'react';

const CanvasThumbnail = ({ gameName }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    canvas.width = 200;
    canvas.height = 100;

    // Background color
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text settings
    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(gameName, canvas.width / 2, canvas.height / 2);
  }, [gameName]);

  return <canvas ref={canvasRef} />;
};

export default CanvasThumbnail;