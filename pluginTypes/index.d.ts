/// <amd-module name="@scom/page-meta/interface.ts" />
declare module "@scom/page-meta/interface.ts" {
    interface ISettings {
    }
    interface IConfig {
        data?: Record<string, any>;
    }
    export { ISettings, IConfig };
}
/// <amd-module name="@scom/page-meta/model/index.ts" />
declare module "@scom/page-meta/model/index.ts" {
    import { IConfig, ISettings } from "@scom/page-meta/interface.ts";
    interface IOptions {
        onUpdateBlock: () => void;
        onUpdateTheme: () => void;
    }
    export class Model {
        private _data;
        private _options;
        private _tag;
        constructor(options: IOptions);
        get tag(): ISettings;
        get data(): Record<string, any>;
        set data(value: Record<string, any>);
        setData(data: IConfig): void;
        private getData;
        private getTag;
        setTag(value: ISettings): void;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        } | {
            name: string;
            target: string;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            getActions?: undefined;
        })[];
    }
}
/// <amd-module name="@scom/page-meta" />
declare module "@scom/page-meta" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-page-meta']: ScomPageMetaElement;
            }
        }
    }
    interface ScomPageMetaElement extends ControlElement {
        data?: Record<string, any>;
    }
    export default class ScomPageMeta extends Module {
        private model;
        constructor(parent?: Container, options?: any);
        get data(): Record<string, any>;
        set data(value: Record<string, any>);
        private setData;
        private onUpdateBlock;
        private createMeta;
        private onUpdateTheme;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        } | {
            name: string;
            target: string;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            getActions?: undefined;
        })[];
        init(): void;
    }
}
