"use client";
import React from "react";

export interface RadarPoint {
  label: string;
  value: number; // 0 to 100
}

interface RadarChartProps {
  data: RadarPoint[];
  size?: number;
}

export default function RadarChart({ data, size = 290 }: RadarChartProps) {
  const numSides = data.length;
  const center = 160;
  const maxRadius = 95;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getCoordinates = (index: number, level: number) => {
    const angle = (Math.PI * 2 / numSides) * index - Math.PI / 2;
    const x = center + maxRadius * level * Math.cos(angle);
    const y = center + maxRadius * level * Math.sin(angle);
    return { x, y };
  };

  // Concentric grid polygons
  const gridPolygons = levels.map((lvl) =>
    data.map((_, i) => {
      const { x, y } = getCoordinates(i, lvl);
      return `${x},${y}`;
    }).join(" ")
  );

  // Data shape
  const dataPoints = data.map((d, i) => {
    const ratio = Math.min(Math.max(d.value / 100, 0), 1);
    const { x, y } = getCoordinates(i, ratio);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 320 320"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Multi-color radar gradient */}
          <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.55" />
          </linearGradient>
          <filter id="radarGlowFilter">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Grid polygons */}
        {gridPolygons.map((poly, idx) => (
          <polygon
            key={idx}
            points={poly}
            fill="none"
            stroke={idx === levels.length - 1 ? "#2d3f5a" : "#1e293b"}
            strokeWidth={idx === levels.length - 1 ? 1.5 : 0.8}
            strokeDasharray={idx < levels.length - 1 ? "3 3" : undefined}
          />
        ))}

        {/* Spoke lines */}
        {data.map((_, i) => {
          const { x, y } = getCoordinates(i, 1.0);
          return (
            <line
              key={i}
              x1={center} y1={center}
              x2={x} y2={y}
              stroke="#2d3f5a"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Filled data polygon */}
        <polygon
          points={dataPoints}
          fill="url(#radarGrad)"
          stroke="#22d3ee"
          strokeWidth="2"
          filter="url(#radarGlowFilter)"
        />

        {/* Vertex glow dots */}
        {data.map((d, i) => {
          const ratio = Math.min(Math.max(d.value / 100, 0), 1);
          const { x, y } = getCoordinates(i, ratio);
          return (
            <g key={i}>
              {/* Outer glow ring */}
              <circle cx={x} cy={y} r="9" fill="#22d3ee" fillOpacity="0.12" />
              {/* Core dot */}
              <circle cx={x} cy={y} r="4.5" fill="#22d3ee" stroke="#ffffff" strokeWidth="1.5" />
            </g>
          );
        })}

        {/* Labels */}
        {data.map((d, i) => {
          const angle = (Math.PI * 2 / numSides) * i - Math.PI / 2;
          const labelRadius = 1.38;
          const lx = center + maxRadius * labelRadius * Math.cos(angle);
          const ly = center + maxRadius * labelRadius * Math.sin(angle);

          const cosA = Math.cos(angle);
          const textAnchor =
            cosA > 0.2 ? "start" : cosA < -0.2 ? "end" : "middle";

          return (
            <g key={i}>
              <text
                x={lx}
                y={ly - 5}
                textAnchor={textAnchor}
                fill="#94a3b8"
                fontSize="10"
                fontWeight="600"
                fontFamily="system-ui, sans-serif"
              >
                {d.label}
              </text>
              <text
                x={lx}
                y={ly + 8}
                textAnchor={textAnchor}
                fill="#22d3ee"
                fontSize="11"
                fontWeight="800"
                fontFamily="system-ui, sans-serif"
              >
                {d.value}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
