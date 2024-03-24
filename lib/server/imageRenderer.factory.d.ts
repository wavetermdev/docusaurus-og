import { PageData } from '../index';
import { BlogPageData } from './types/blog.types';
import { DocsPageData } from './types/docs.types';
import { ImageRenderer } from './types/image.types';
export declare function imageRendererFactory(plugin: 'docusaurus-plugin-content-docs', handler: ImageRenderer<DocsPageData>): ImageRenderer;
export declare function imageRendererFactory(plugin: 'docusaurus-plugin-content-blog', handler: ImageRenderer<BlogPageData>): ImageRenderer;
export declare function imageRendererFactory(plugin: 'docusaurus-plugin-content-pages', handler: ImageRenderer<PageData>): ImageRenderer;
