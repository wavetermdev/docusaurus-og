"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultBar = void 0;
const tslib_1 = require("tslib");
const cli_progress_1 = tslib_1.__importDefault(require("cli-progress"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const figures_1 = tslib_1.__importDefault(require("figures"));
function defaultBar() {
    return new cli_progress_1.default.SingleBar({
        format: chalk_1.default.green(figures_1.default.bullet) + chalk_1.default.green(' og images ') + '{bar}' + chalk_1.default.white(' {prefix} ({percentage}%) ') + chalk_1.default.grey('{value}/{total} ') + chalk_1.default.grey('{suffix}'),
        barCompleteChar: chalk_1.default.green('█'),
        barIncompleteChar: chalk_1.default.white('█'),
        hideCursor: true
    });
}
exports.defaultBar = defaultBar;
;
