import { LoadedPlugin, Props } from '@docusaurus/types';
import { ImageGenerator } from './imageGenerator';
import { BlogPageData } from './types/blog.types';
import { ImageRenderer } from './types/image.types';
import { PluginOptions } from './types/plugin.types';
export declare class BlogPlugin {
    private context;
    private options;
    private imageGenerator;
    private imageRenderer;
    static plugin: string;
    pages: Omit<BlogPageData, 'document'>[];
    constructor(context: Props, options: PluginOptions, imageGenerator: ImageGenerator, imageRenderer: ImageRenderer);
    process: () => Promise<void>;
    loadData: () => Promise<void>;
    loadInstance: (plugin: LoadedPlugin) => Promise<void>;
    generate: () => Promise<void>;
    getHtmlPath: (permalink: string, baseUrl?: string) => string;
}
