import { IConfig, ISettings } from "../interface";

interface IOptions {
  onUpdateBlock: () => void;
  onUpdateTheme: () => void;
}

export class Model {
  private _data: IConfig = {};
  private _options: IOptions;
  private _tag: ISettings = {};

  constructor(options: IOptions) {
    this._options = options;
  }

  get tag() {
    return this._tag || {};
  }

  get data() {
    return this._data;
  }

  set data(value: Record<string, any>) {
    this._data = value;
  }

  setData(data: IConfig) {
    this._data = data;
    this._options?.onUpdateBlock();
  }

  private getData() {
    return this._data || {};
  }

  private getTag() {
    return this._tag || {};
  }

  setTag(value: ISettings) {
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
          return []
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