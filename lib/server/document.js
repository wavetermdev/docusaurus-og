"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const tslib_1 = require("tslib");
const fsp = tslib_1.__importStar(require("fs/promises"));
const node_html_parser_1 = require("node-html-parser");
const IMAGE_META_ELEMENTS = [
    ['name', 'image'],
    ['property', 'og:image'],
    ['name', 'twitter:image'],
];
class Document {
    path;
    root;
    loaded = false;
    constructor(path) {
        this.path = path;
    }
    load = async () => {
        const htmlString = await fsp.readFile(this.path, 'utf-8');
        this.root = (0, node_html_parser_1.parse)(htmlString);
        this.loaded = true;
    };
    write = async () => {
        await fsp.writeFile(this.path, Buffer.from(this.root.outerHTML));
    };
    setImage = async (url) => {
        IMAGE_META_ELEMENTS.forEach(([attr, value]) => this.updateMeta(attr, value, {
            content: url,
        }));
    };
    get head() {
        return this.root.querySelector('head');
    }
    getMeta(attr, value) {
        const { head } = this;
        let meta = head.querySelector(`meta[${attr}=${value}]`);
        if (!meta) {
            meta = new node_html_parser_1.HTMLElement('meta', {}, '', undefined, [0, 0]);
            meta.setAttribute(attr, value);
            head.appendChild(meta);
        }
        return meta;
    }
    updateMeta = (attr, value, attrs) => {
        const el = this.getMeta(attr, value);
        Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
        return el;
    };
}
exports.Document = Document;
