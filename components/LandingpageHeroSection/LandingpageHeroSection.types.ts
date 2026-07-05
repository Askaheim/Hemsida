import * as THREE from 'three'
import { BufferGeometry, BufferGeometryEventMap, Material, MaterialEventMap, NormalBufferAttributes } from 'three';

export interface LandingpageHeroSectionProps {
    hero: {
        heroTitle?: string;
        heroText: {
            json: {
                content: Array<{
                    content: Array<{
                        value: string;
                    }>;
                }>;
            };
        };
        heroCtaPrimary?: string;
        heroCtaSecondary?: string;
        heroImage?: {
            url: string;

        };
    };
}

export interface TileProps {
    col: number;
    row: number;
    delay: number;
    gridOffsetX: number;
    gridOffsetY: number;
    materials: Material<MaterialEventMap> | Material<MaterialEventMap>[];
    geometry: BufferGeometry<NormalBufferAttributes, BufferGeometryEventMap>
}