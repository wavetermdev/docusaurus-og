import React from 'react';
import { type SatoriOptions } from 'satori';
export type ImageGeneratorOptions = SatoriOptions;
export type ImageGeneratorResult = {
    url: string;
    relativePath: string;
    absolutePath: string;
};
export declare class ImageGenerator {
    private args;
    private satori;
    private sharp;
    private cache;
    private outDir;
    constructor(args: {
        dir: string;
        websiteUrl: string;
        websiteOutDir: string;
    });
    init: () => Promise<void>;
    generate: (element: React.ReactNode, options: ImageGeneratorOptions) => Promise<ImageGeneratorResult>;
}
