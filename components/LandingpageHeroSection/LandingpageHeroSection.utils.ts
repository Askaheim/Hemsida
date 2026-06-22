import { useMemo, useRef } from "react";
import * as THREE from "three";

// Fallback JS-side colors (used in R3F, which can't read CSS vars directly).
// Mirror the CSS variable values here so the 3D tiles match the CSS layer.
export const TILE_COLORS = {
    face: "#f0ede8",       // --tile-color-face
    edge: "#c8c3bc",       // --tile-color-edge
    specular: "#ffffff",   // --tile-color-specular
    heroBg: "#1e1c1a",     // --hero-bg  (also set on the canvas style below)
};

// Grid config
export const GRID_COLS = 9;
export const GRID_ROWS = 6;
export const TILE_W = 1.0;       // tile width  (world units)
export const TILE_H = 1.0;       // tile height
export const TILE_DEPTH = 0.08;  // tile thickness — the satisfying 3D "slab" feel
export const GROUT_GAP = 0.06;   // gap between tiles
export const CELL = TILE_W + GROUT_GAP;

// How far above the grid tiles start falling from
export const SPAWN_Y = 14;
// Delay between each tile starting to fall (seconds)
export const STAGGER = 0.08;
// Gravity-like pull (world units / s²) — increase for snappier feel
export const GRAVITY = 6.5;
// How quickly the tile rotation damps as it nears its target (0–1)
export const ROT_DAMPING = 0.12;

export const useTileMaterials = () => {
    return useMemo(() => {
        const face = new THREE.MeshStandardMaterial({
            color: new THREE.Color(TILE_COLORS.face),
            roughness: 0.35,
            metalness: 0.05,
        });
        const edge = new THREE.MeshStandardMaterial({
            color: new THREE.Color(TILE_COLORS.edge),
            roughness: 0.6,
            metalness: 0.0,
        });
        // BoxGeometry face order: +X, -X, +Y, -Y, +Z(front), -Z(back)
        // We want the two Z faces to be "face" and the four sides to be "edge"
        return [edge, edge, edge, edge, face, face];
    }, []);
}

export const useTileGeometry = () => {
    return useMemo(
        () => new THREE.BoxGeometry(TILE_W, TILE_H, TILE_DEPTH, 1, 1, 1),
        []
    );
}