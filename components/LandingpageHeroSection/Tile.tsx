import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TileProps } from "./LandingpageHeroSection.types";

const Tile = ({ col, row, delay, gridOffsetX, gridOffsetY, materials, geometry }: TileProps) => {
    const mesh = useRef<THREE.Mesh>(null);
    const targetX = col * 1.06 - gridOffsetX;
    const targetY = row * 1.06 - gridOffsetY;

    // Fixed: Math.random values are saved here inside the ref so they persist safely during execution
    const state = useRef({
        elapsed: 0,
        velocityY: 0,
        settled: false,
        startX: targetX + (Math.random() - 0.5) * 3,
        startY: 14 + Math.random() * 4,
        startZ: (Math.random() - 0.5) * 2,
        rotX: (Math.random() - 0.5) * Math.PI * 2,
        rotY: (Math.random() - 0.5) * Math.PI * 2,
        rotZ: (Math.random() - 0.5) * Math.PI * 2,
    });

    useFrame((stateContext, delta) => {
        if (!mesh.current) return;
        const s = state.current;
        s.elapsed += delta;
        if (s.elapsed < delay) return;

        if (!s.settled) {
            s.velocityY -= 6.5 * delta;
            const currentY = mesh.current.position.y + s.velocityY * delta;

            if (currentY <= targetY) {
                mesh.current.position.y = targetY;
                mesh.current.position.x = targetX;
                s.settled = true;
                s.velocityY = 0;
            } else {
                const currentX = mesh.current.position.x;
                mesh.current.position.x = THREE.MathUtils.lerp(currentX, targetX, delta * 2);
                mesh.current.position.y = currentY;
                mesh.current.rotation.x += delta * 1.8;
                mesh.current.rotation.y += delta * 2.2;
                mesh.current.rotation.z += delta * 0.9;
            }
        } else {
            // INTERACTIVE MOUSE EFFECT
            const mouseX = (stateContext.pointer.x * stateContext.viewport.width) / 2;
            const mouseY = (stateContext.pointer.y * stateContext.viewport.height) / 2;

            const dx = mesh.current.position.x - mouseX;
            const dy = mesh.current.position.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const effectRadius = 2.5;
            let targetZ = 0;
            let targetRotX = 0;
            let targetRotY = 0;

            if (distance < effectRadius) {
                const strength = 1 - (distance / effectRadius);
                targetZ = -0.6 * strength;
                targetRotX = dy * strength * 0.3;
                targetRotY = -dx * strength * 0.3;
            }
            mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, targetZ, 0.1);
            mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, targetRotX, 0.1);
            mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, targetRotY, 0.1);
            mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, 0, 0.1);
        }
    });

    return (
        <mesh
            ref={mesh}
            geometry={geometry}
            material={materials}
            position={[state.current.startX, state.current.startY, state.current.startZ]}
        />
    );
}

export default Tile;