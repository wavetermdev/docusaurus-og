"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocsPlugin = void 0;
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const document_1 = require("./document");
class DocsPlugin {
    context;
    options;
    imageGenerator;
    imageRenderer;
    static plugin = 'docusaurus-plugin-content-docs';
    docs = [];
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
        const { plugins = [] } = this.context;
        const docPlugins = plugins.filter((plugin) => plugin.name === DocsPlugin.plugin);
        for (const plugin of docPlugins) {
            await this.loadInstance(plugin);
        }
    };
    loadInstance = async (plugin) => {
        const content = plugin.content;
        const options = plugin.options;
        const { loadedVersions } = content;
        for (const version of loadedVersions) {
            await this.loadVersion(options, version);
        }
    };
    loadVersion = async (options, version) => {
        this.docs.push(...version.docs.map((doc) => ({
            version,
            metadata: doc,
            plugin: options,
        })));
    };
    generate = async () => {
        for (const doc of this.docs) {
            const document = new document_1.Document(this.getHtmlPath(doc));
            await document.load();
            const image = await this.imageRenderer({
                ...doc,
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
    getHtmlPath = (doc) => 
    // slug is used here instead of permalink because permalink already contains version and locale paths of websiteOutDir
    doc.metadata?.slug &&
        path.join(this.context.outDir, doc.metadata.slug, 'index.html');
}
exports.DocsPlugin = DocsPlugin;
