import { Module, customModule } from '@ijstech/components';
import ScomPageMeta from '@scom/page-meta';

@customModule
export default class Main extends Module {

  init() {
    super.init();
  }

  render() {
    return <i-vstack width={'100%'} height={'100%'} gap="1rem" margin={{top: '1rem'}}>
      <i-page-meta
        data={{
          title: 'Page Meta',
          description: 'Page Meta Description'
        }}
      />
    </i-vstack>
  }
}