var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/page-meta/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/page-meta/model/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    class Model {
        constructor(options) {
            this._data = {};
            this._tag = {};
            this._options = options;
        }
        get tag() {
            return this._tag || {};
        }
        get data() {
            return this._data;
        }
        set data(value) {
            this._data = value;
        }
        setData(data) {
            this._data = data;
            this._options?.onUpdateBlock();
        }
        getData() {
            return this._data || {};
        }
        getTag() {
            return this._tag || {};
        }
        setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    this._tag[prop] = newValue[prop];
                }
            }
            this._options?.onUpdateTheme();
            this._options?.onUpdateBlock();
        }
        getConfigurators() {
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        return [];
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this),
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this),
                },
            ];
        }
    }
    exports.Model = Model;
});
define("@scom/page-meta", ["require", "exports", "@ijstech/components", "@scom/page-meta/model/index.ts"], function (require, exports, components_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ScomPageMeta = class ScomPageMeta extends components_1.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        get data() {
            return this.model.data;
        }
        set data(value) {
            this.model.data = value;
        }
        async setData(data) {
            this.model.setData(data);
        }
        onUpdateBlock() {
            if (!this.data || typeof this.data !== 'object')
                return;
            for (const prop in this.data) {
                if (this.data.hasOwnProperty(prop)) {
                    const value = this.data[prop] || '';
                    if (prop === 'title') {
                        document.title = value;
                    }
                    else {
                        const isOg = prop.includes('og:');
                        const key = isOg ? 'property' : 'name';
                        const metaEl = document.querySelector(`meta[${key}="${prop}"]`);
                        if (metaEl)
                            metaEl.content = value;
                        else
                            this.createMeta(prop, value, key);
                    }
                }
            }
        }
        createMeta(name, content, key) {
            const metaEl = document.createElement('meta');
            metaEl.setAttribute(key, name);
            metaEl.setAttribute('content', content);
            document.head.appendChild(metaEl);
        }
        onUpdateTheme() { }
        getConfigurators() {
            return this.model.getConfigurators();
        }
        init() {
            super.init();
            this.model = new index_1.Model({
                onUpdateBlock: () => this.onUpdateBlock(),
                onUpdateTheme: () => this.onUpdateTheme()
            });
            const data = this.getAttribute('data', true);
            if (data)
                this.setData(data);
            const tag = this.getAttribute('tag', true);
            if (tag)
                this.model.setTag(tag);
        }
    };
    ScomPageMeta = __decorate([
        components_1.customModule,
        (0, components_1.customElements)("i-page-meta", {
            icon: 'stop',
            props: {
                data: {
                    type: 'object'
                }
            },
            className: 'ScomPageMeta',
            events: {}
        })
    ], ScomPageMeta);
    exports.default = ScomPageMeta;
});
