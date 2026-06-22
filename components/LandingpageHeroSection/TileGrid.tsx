import { useMemo } from "react";
import { GRID_COLS, GRID_ROWS, TILE_W, TILE_H, GROUT_GAP, CELL, STAGGER, useTileMaterials, useTileGeometry } from "./LandingpageHeroSection.utils";
import Tile from "./Tile";



const TileGrid = () => {
    const materials = useTileMaterials();
    const geometry = useTileGeometry();

    // Center the grid
    const gridW = GRID_COLS * CELL - GROUT_GAP;
    const gridH = GRID_ROWS * CELL - GROUT_GAP;
    const offsetX = gridW / 2 - TILE_W / 2;
    const offsetY = gridH / 2 - TILE_H / 2;

    const tiles = useMemo(() => {
        const list = [];
        for (let row = 0; row < GRID_ROWS; row++) {
            for (let col = 0; col < GRID_COLS; col++) {
                // Stagger by column + row for a wave-like cascade
                const delay = (col + (GRID_ROWS - 1 - row)) * STAGGER + Math.random() * 0.1;
                list.push({ col, row, delay, key: `${col}-${row}` });
            }
        }
        return list;
    }, []);

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
}

export default TileGrid;