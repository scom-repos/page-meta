import {
  Module,
  customElements,
  ControlElement,
  customModule,
  Container
} from '@ijstech/components';
import { Model } from './model/index';
import { IConfig } from './interface';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-page-meta']: ScomPageMetaElement;
    }
  }
}

interface ScomPageMetaElement extends ControlElement {
  data?: Record<string, any>;
}

@customModule
@customElements("i-page-meta", {
  icon: 'stop',
  props: {
    data: {
      type: 'object'
    }
  },
  className: 'ScomPageMeta',
  events: {}
})
export default class ScomPageMeta extends Module {
  private model: Model;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get data() {
    return this.model.data
  }

  set data(value: Record<string, any>) {
    this.model.data = value;
  }

  private async setData(data: IConfig) {
    this.model.setData(data);
  }

  private onUpdateBlock() {
    if (!this.data || typeof this.data !== 'object') return;

    for (const prop in this.data) {
      if (this.data.hasOwnProperty(prop)) {
        const value = this.data[prop] || '';
        if (prop === 'title') {
          document.title = value;
        } else {
          const isOg = prop.includes('og:');
          const key = isOg ? 'property' : 'name';
          const metaEl = document.querySelector(`meta[${key}="${prop}"]`) as HTMLMetaElement;
          if (metaEl) metaEl.content = value;
          else this.createMeta(prop, value, key);
        }
      }
    }
  }

  private createMeta(name: string, content: string, key: string) {
    const metaEl = document.createElement('meta');
    metaEl.setAttribute(key, name);
    metaEl.setAttribute('content', content);
    document.head.appendChild(metaEl);
  }

  private onUpdateTheme() {}

  getConfigurators() {
    return this.model.getConfigurators();
  }

  init() {
    super.init();
      this.model = new Model({
        onUpdateBlock: () => this.onUpdateBlock(),
        onUpdateTheme: () => this.onUpdateTheme()
      });
    const data = this.getAttribute('data', true);
    if (data) this.setData(data);

    const tag = this.getAttribute('tag', true);
    if (tag) this.model.setTag(tag);
  }
}