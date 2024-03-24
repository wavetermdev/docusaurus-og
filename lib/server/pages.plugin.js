"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesPlugin = void 0;
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const document_1 = require("./document");
class PagesPlugin {
    context;
    options;
    imageGenerator;
    imageRenderer;
    static plugin = 'docusaurus-plugin-content-pages';
    pages = [];
    constructor(context, options, imageGenerator, imageRenderer) {
        this.context = context;
        this.options = options;
        this.imageGenerator = imageGenerator;
        this.imageRenderer = imageRenderer;
    }
    process = async () => {
        await this.loadData();
        await this.generate();
    };
    loadData = async () => {
        const plugins = this.context.plugins.filter((plugin) => plugin.name === PagesPlugin.plugin);
        for (const plugin of plugins) {
            await this.loadInstance(plugin);
        }
    };
    loadInstance = async (plugin) => {
        const content = plugin.content;
        const options = plugin.options;
        if (!Array.isArray(content))
            return;
        for (const metadata of content) {
            const doc = new document_1.Document(this.getHtmlPath(metadata.permalink));
            await doc.load();
            const title = (doc.loaded && doc.root.querySelector('title')?.textContent) || '';
            const description = (doc.loaded &&
                doc.root.querySelector('meta[name=description]')?.textContent) ||
                '';
            this.pages.push({
                metadata: {
                    ...metadata,
                    title,
                    description,
                },
                plugin: options,
            });
        }
    };
    generate = async () => {
        for (const page of this.pages) {
            const document = new document_1.Document(this.getHtmlPath(page.metadata.permalink));
            await document.load();
            if (!document.loaded)
                continue;
            const image = await this.imageRenderer({
                ...page,
                document,
                websiteOutDir: this.context.outDir,
            }, this.context);
            if (!image) {
                await document.write();
                continue;
            }
            const generated = await this.imageGenerator.generate(...image);
            await document.setImage(generated.url);
            await document.write();
        }
    };
    getHtmlPath = (permalink) => path.join(this.context.outDir, permalink, 'index.html');
}
exports.PagesPlugin = PagesPlugin;
