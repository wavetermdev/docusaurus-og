"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBuildFactory = void 0;
const blog_plugin_1 = require("./blog.plugin");
const docs_plugin_1 = require("./docs.plugin");
const imageGenerator_1 = require("./imageGenerator");
const pages_plugin_1 = require("./pages.plugin");
const plugins = {
    [docs_plugin_1.DocsPlugin.plugin]: docs_plugin_1.DocsPlugin,
    [blog_plugin_1.BlogPlugin.plugin]: blog_plugin_1.BlogPlugin,
    [pages_plugin_1.PagesPlugin.plugin]: pages_plugin_1.PagesPlugin,
};
const postBuildFactory = (options) => async (props) => {
    const imageGenerator = new imageGenerator_1.ImageGenerator({
        websiteUrl: props.siteConfig.url,
        websiteOutDir: props.outDir,
        dir: options.path,
    });
    await imageGenerator.init();
    const pluginNames = Object.keys(options.imageRenderers);
    for (const pluginName of pluginNames) {
        const renderer = options.imageRenderers[pluginName];
        const Plugin = plugins[pluginName];
        const plugin = Plugin && new Plugin(props, options, imageGenerator, renderer);
        plugin && (await plugin.process());
    }
};
exports.postBuildFactory = postBuildFactory;
