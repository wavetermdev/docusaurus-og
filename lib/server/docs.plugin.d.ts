/// <reference types="@docusaurus/plugin-content-docs/src/plugin-content-docs.js" />
import { PluginOptions as DocsPluginOptions, LoadedVersion } from '@docusaurus/plugin-content-docs';
import { LoadedPlugin, Props } from '@docusaurus/types';
import { ImageGenerator } from './imageGenerator';
import { DocsPageData } from './types/docs.types';
import { ImageRenderer } from './types/image.types';
import { PluginOptions } from './types/plugin.types';
export declare class DocsPlugin {
    private context;
    private options;
    private imageGenerator;
    private imageRenderer;
    static plugin: string;
    docs: Omit<DocsPageData, 'document'>[];
    constructor(context: Props, options: PluginOptions, imageGenerator: ImageGenerator, imageRenderer: ImageRenderer);
    process: () => Promise<void>;
    loadData: () => Promise<void>;
    loadInstance: (plugin: LoadedPlugin) => Promise<void>;
    loadVersion: (options: DocsPluginOptions, version: LoadedVersion) => Promise<void>;
    generate: () => Promise<void>;
    getHtmlPath: (doc: Partial<DocsPageData>) => string | undefined;
}
