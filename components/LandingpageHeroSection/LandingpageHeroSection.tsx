"use client";

import { Canvas } from "@react-three/fiber";
import TileGrid from "./TileGrid";
import { LandingpageHeroSectionProps } from "./LandingpageHeroSection.types";
import ContentBox from "../ContentBox/ContentBox";
import { motion, Variants } from 'framer-motion'
import { slideIn } from "@/lib/motion";

const LandingpageHeroSection = ({ heroTitle, heroText, heroImage, heroCtaPrimary, heroCtaSecondary }: LandingpageHeroSectionProps) => {

  const slideIn = (
    direction: string,
    type: string,
    delay: number,
    duration: number
  ): Variants => ({
    hidden: {
      x: direction === 'left' ? '-100%' : '100%',
      opacity: 0,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut"
      },
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut"
      },
    },
  });

  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#fff" }}>
      <Canvas
        style={{ position: "absolute", inset: 0 }}
        camera={{ position: [0, 0, 10], fov: 32 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#493a3a"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[-4, 8, 6]} intensity={1.4} />
        <pointLight position={[0, -6, 4]} intensity={0.3} color="#f0ede8" />
        <TileGrid />
      </Canvas>
      <motion.div
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
        variants={slideIn('right', "tween", 0.2, 1)}
      >
        <ContentBox variant="light" heroTitle={heroTitle} heroText={heroText} heroImage={heroImage} heroCtaPrimary={heroCtaPrimary} heroCtaSecondary={heroCtaSecondary} />
      </motion.div>
    </section>
  );
}

export default LandingpageHeroSection;