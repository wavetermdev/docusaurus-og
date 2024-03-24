"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageGenerator = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const fsp = tslib_1.__importStar(require("fs/promises"));
const object_hash_1 = tslib_1.__importDefault(require("object-hash"));
const path_1 = tslib_1.__importDefault(require("path"));
const resvg_js_1 = require("@resvg/resvg-js");
class ImageGenerator {
    args;
    satori;
    cache = {};
    outDir = '';
    constructor(args) {
        this.args = args;
        this.outDir = path_1.default.join(this.args.websiteOutDir, this.args.dir);
    }
    init = async () => {
        this.satori = await import('satori').then((mod) => mod.default);
        if (!fs.existsSync(this.outDir))
            await fsp.mkdir(this.outDir, { recursive: true });
    };
    generate = async (element, options) => {
        const hash = (0, object_hash_1.default)([element, options]);
        if (this.cache[hash])
            return this.cache[hash];
        const imageName = `${hash}.png`;
        const absolutePath = path_1.default.join(this.outDir, imageName);
        const relativePath = path_1.default.join('/', this.args.dir, absolutePath.slice(this.outDir.length));
        const svg = await this.satori(element, options);
        const resvg = new resvg_js_1.Resvg(svg);
        const pngOutput = resvg.render();
        await fsp.writeFile(absolutePath, pngOutput.asPng());
        const url = new URL(this.args.websiteUrl);
        url.pathname = relativePath;
        this.cache[hash] = {
            relativePath,
            absolutePath,
            url: url.toString(),
        };
        return this.cache[hash];
    };
}
exports.ImageGenerator = ImageGenerator;
