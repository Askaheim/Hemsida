import * as THREE from "three";

export const TILE_COLORS = {
    edge: "#c8c3bc",
};

export const TILE_W = 1.0;
export const TILE_H = 1.0;
export const TILE_DEPTH = 0.06;
export const GROUT_GAP = 0.04;
export const CELL = TILE_W + GROUT_GAP;

export const STAGGER = 0.08;

export const createTileMaterials = (textures: { color: THREE.Texture; normal?: THREE.Texture }) => {
    textures.color.colorSpace = THREE.SRGBColorSpace;

    const face = new THREE.MeshStandardMaterial({
        map: textures.color,
        roughness: 0.4,
        metalness: 0.05,
    });

    // Only inject normal map if it exists and loaded cleanly
    if (textures.normal) {
        face.normalMap = textures.normal;
        face.normalScale = new THREE.Vector2(0.5, 0.5); // Kept it a bit subtle
    }

    const edge = new THREE.MeshStandardMaterial({
        color: new THREE.Color(TILE_COLORS.edge),
        roughness: 0.7,
        metalness: 0.0,
    });

    return [edge, edge, edge, edge, face, face];
};

export const useTileGeometry = () => {
    return new THREE.BoxGeometry(TILE_W, TILE_H, TILE_DEPTH, 1, 1, 1);
};