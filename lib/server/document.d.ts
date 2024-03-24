import { HTMLElement } from 'node-html-parser';
export declare class Document {
    private path;
    root: HTMLElement;
    loaded: boolean;
    constructor(path: string);
    load: () => Promise<void>;
    write: () => Promise<void>;
    setImage: (url: string) => Promise<void>;
    get head(): HTMLElement;
    private getMeta;
    private updateMeta;
}
