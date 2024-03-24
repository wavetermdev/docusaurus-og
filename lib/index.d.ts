import type { LoadContext, Plugin } from '@docusaurus/types';
import { PluginOptions } from './server/types/plugin.types';
export { imageRendererFactory } from './server/imageRenderer.factory';
export * from './server/types';
export type { PluginOptions };
export default function logosTheme(context: LoadContext, options: PluginOptions): Plugin<any>;
