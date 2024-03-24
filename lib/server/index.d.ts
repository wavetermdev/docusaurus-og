import { Props } from '@docusaurus/types';
import { PluginOptions } from './types/plugin.types';
export declare const postBuildFactory: (options: PluginOptions) => (props: Props) => Promise<void>;
