"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPlugin = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
const document_1 = require("./document");
class BlogPlugin {
    context;
    options;
    imageGenerator;
    imageRenderer;
    static plugin = 'docusaurus-plugin-content-blog';
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
        const plugins = this.context.plugins.filter((plugin) => plugin.name === BlogPlugin.plugin);
        for (const plugin of plugins) {
            await this.loadInstance(plugin);
        }
    };
    loadInstance = async (plugin) => {
        const content = plugin.content;
        const options = plugin.options;
        content.blogListPaginated.forEach((value) => {
            this.pages.push({
                data: value,
                plugin: options,
                pageType: 'list',
                permalink: value.metadata.permalink,
            });
        });
        content.blogPosts.forEach((post) => {
            this.pages.push({
                data: post,
                plugin: options,
                pageType: 'post',
                permalink: post.metadata.permalink,
            });
        });
        if (content.blogTagsListPath) {
            const filePath = this.getHtmlPath(content.blogTagsListPath);
            fs.existsSync(filePath) &&
                this.pages.push({
                    pageType: 'tags',
                    plugin: options,
                    data: {
                        permalink: content.blogTagsListPath,
                    },
                    permalink: content.blogTagsListPath,
                });
        }
        if (options.archiveBasePath) {
            const permalink = path.join('/', options.routeBasePath, options.archiveBasePath);
            fs.existsSync(this.getHtmlPath(permalink)) &&
                this.pages.push({
                    plugin: options,
                    pageType: 'archive',
                    data: { permalink: permalink },
                    permalink,
                });
        }
        {
            Object.entries(content.blogTags).map(([key, value]) => {
                value.pages.forEach((page) => {
                    this.pages.push({
                        pageType: 'tag',
                        plugin: options,
                        data: { ...page.metadata, label: value.label },
                        permalink: page.metadata.permalink,
                    });
                });
            });
        }
    };
    generate = async () => {
        for (const page of this.pages) {
            const document = new document_1.Document(this.getHtmlPath(page.permalink));
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
    getHtmlPath = (permalink, baseUrl) => path.join(this.context.outDir, permalink, 'index.html');
}
exports.BlogPlugin = BlogPlugin;
