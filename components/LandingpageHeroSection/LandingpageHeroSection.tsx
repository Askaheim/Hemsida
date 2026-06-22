"use client";

import { Canvas } from "@react-three/fiber";
import TileGrid from "./TileGrid";

interface HeroSectionProps {
  heroTitle?: string;
  heroText?: string;
}

export default function HeroSection({ heroTitle, heroText }: HeroSectionProps) {
  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#1e1c1a" }}>
      <Canvas style={{ position: "absolute", inset: 0 }} camera={{ position: [0, 0, 10], fov: 50 }} gl={{ antialias: true, alpha: false }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[-4, 8, 6]} intensity={1.4} />
        <pointLight position={[0, -6, 4]} intensity={0.3} color="#f0ede8" />
        <TileGrid />
      </Canvas>

      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 10, pointerEvents: "none" }}>
        {/* HÄR MAPPAR VI IN DATA FRÅN CONTENTFUL DYNAMISKT */}
        <h1 style={{ color: "#f0ede8", fontSize: "clamp(2rem, 6vw, 5rem)", fontWeight: 700, textAlign: "center", margin: 0 }}>
          {heroTitle || "Default Headline"}
        </h1>
        {heroText && (
          <p style={{ color: "#c8c3bc", fontSize: "clamp(1rem, 2vw, 1.4rem)", marginTop: "1rem", textAlign: "center" }}>
            {heroText}
          </p>
        )}
      </div>
    </section>
  );
}