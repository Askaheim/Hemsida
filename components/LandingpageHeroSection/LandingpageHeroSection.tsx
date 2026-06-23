"use client";

import { Canvas } from "@react-three/fiber";
import TileGrid from "./TileGrid";
import { LandingpageHeroSectionProps } from "./LandingpageHeroSection.types";
import ContentBox from "@/components/ContentBox/ContentBox";
import { useState } from "react";


const LandingpageHeroSection = ({ heroTitle, heroText, heroCtaPrimary, heroCtaSecondary }: LandingpageHeroSectionProps) => {
  const [showContent, setShowContent] = useState(false);
  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#fff" }}>
      <Canvas
        style={{ position: "absolute", inset: 0 }}
        camera={{ position: [0, 0, 10], fov: 32 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#f8f6f6"]} /> {/* Sets WebGL clear color to white */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[-4, 8, 6]} intensity={1.4} />
        <pointLight position={[0, -6, 4]} intensity={0.3} color="#f0ede8" />
        <TileGrid onGridSettled={() => setShowContent(true)} />
      </Canvas>
      <ContentBox
        heroTitle={heroTitle}
        heroText={heroText}
        heroCtaPrimary={heroCtaPrimary}
        heroCtaSecondary={heroCtaSecondary}
        isVisible={showContent}
      />
    </section>
  );
}

export default LandingpageHeroSection;