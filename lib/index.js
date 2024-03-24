"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRendererFactory = void 0;
const tslib_1 = require("tslib");
const index_1 = require("./server/index");
var imageRenderer_factory_1 = require("./server/imageRenderer.factory");
Object.defineProperty(exports, "imageRendererFactory", { enumerable: true, get: function () { return imageRenderer_factory_1.imageRendererFactory; } });
tslib_1.__exportStar(require("./server/types"), exports);
function logosTheme(context, options) {
    return {
        name: 'docusaurus-og',
        async postBuild(props) {
            await (0, index_1.postBuildFactory)(options)(props);
        },
    };
}
exports.default = logosTheme;
