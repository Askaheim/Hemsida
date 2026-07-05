import { useMemo, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CELL, TILE_W, TILE_H, STAGGER, createTileMaterials, tileGeometry } from "./LandingpageHeroSection.utils";
import Tile from "./Tile";

type LoadedTextures = {
    color: THREE.Texture;
    normal: THREE.Texture;
}



const TileGrid = () => {
    const { viewport } = useThree();
    const [loadedTextures, setLoadedTextures] = useState<LoadedTextures | null>(null);

    // 1. Preload all textures BEFORE mounting the grid components
    useEffect(() => {
        const textureLoader = new THREE.TextureLoader();
        const textureZoom = 1;
        const offsetValue = (1 - textureZoom) / 2;

        textureLoader.load("/tiles/textures/tile_color.jpg", (colorTex) => {
            colorTex.wrapS = THREE.ClampToEdgeWrapping;
            colorTex.wrapT = THREE.ClampToEdgeWrapping;
            colorTex.repeat.set(textureZoom, textureZoom);
            colorTex.offset.set(offsetValue, offsetValue);

            textureLoader.load("/tiles/textures/tile_normal.jpg", (normalTex) => {
                normalTex.wrapS = THREE.ClampToEdgeWrapping;
                normalTex.wrapT = THREE.ClampToEdgeWrapping;
                normalTex.repeat.set(textureZoom, textureZoom);
                normalTex.offset.set(offsetValue, offsetValue);
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


    // const materials = createTileMaterials(loadedTextures);
    const materials = useMemo(() => {
        if (!loadedTextures) return null;
        return createTileMaterials(loadedTextures);
    }, [loadedTextures]);
    const geometry = tileGeometry;

    const ready = !!loadedTextures && !!materials;

    return (
        <>
            {ready ? (tiles.map(({ col, row, delay, key }) => (
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
            ))) : null}
        </>
    );
};

export default TileGrid;