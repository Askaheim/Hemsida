import { useMemo, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CELL, TILE_W, TILE_H, STAGGER, createTileMaterials, useTileGeometry } from "./LandingpageHeroSection.utils";
import Tile from "./Tile";

const TileGrid = () => {
    const { viewport } = useThree();
    const [loadedTextures, setLoadedTextures] = useState<any>(null);

    // 1. Preload all textures BEFORE mounting the grid components
    useEffect(() => {
        const textureLoader = new THREE.TextureLoader();

        // Adjust this variable to change the zoom level
        // 1.0 = Original size
        // 0.7 = Zoomed in (Texture becomes larger on the tile)
        // 1.5 = Zoomed out (Texture tiles/repeats inside the single tile)
        const textureZoom = 0.5;

        // Calculate offset to keep the texture centered when zooming
        const offsetValue = (1 - textureZoom) / 2;

        textureLoader.load("/tiles/textures/tile_color.jpg", (colorTex) => {
            colorTex.wrapS = THREE.ClampToEdgeWrapping;
            colorTex.wrapT = THREE.ClampToEdgeWrapping;
            colorTex.repeat.set(textureZoom, textureZoom);
            colorTex.offset.set(offsetValue, offsetValue); // Keeps it centered

            textureLoader.load("/tiles/textures/tile_normal.jpg", (normalTex) => {
                normalTex.wrapS = THREE.ClampToEdgeWrapping;
                normalTex.wrapT = THREE.ClampToEdgeWrapping;
                normalTex.repeat.set(textureZoom, textureZoom);
                normalTex.offset.set(offsetValue, offsetValue); // Keeps it centered

                normalTex.colorSpace = THREE.NoColorSpace;

                setLoadedTextures({
                    color: colorTex,
                    normal: normalTex
                });
            });
        });
    }, []);

    const cols = Math.ceil(viewport.width / CELL) + 2;
    const rows = Math.ceil(viewport.height / CELL) + 2;

    const gridW = cols * CELL;
    const gridH = rows * CELL;
    const offsetX = gridW / 2 - TILE_W / 2;
    const offsetY = gridH / 2 - TILE_H / 2;

    const tiles = useMemo(() => {
        const list = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const delay = (col + (rows - 1 - row)) * STAGGER + Math.random() * 0.05;
                list.push({ col, row, delay, key: `${col}-${row}` });
            }
        }
        return list;
    }, [cols, rows]);

    // 2. Gatekeeper: If textures are downloading, render nothing. Prevents middle-of-fall re-renders.
    if (!loadedTextures) return null;

    // 3. Create materials synchronously now that textures are safely cached in memory
    const materials = createTileMaterials(loadedTextures);
    const geometry = useTileGeometry();

    return (
        <>
            {tiles.map(({ col, row, delay, key }) => (
                <Tile
                    key={key}
                    col={col}
                    row={row}
                    delay={delay}
                    gridOffsetX={offsetX}
                    gridOffsetY={offsetY}
                    materials={materials}
                    geometry={geometry}
                />
            ))}
        </>
    );
};

export default TileGrid;