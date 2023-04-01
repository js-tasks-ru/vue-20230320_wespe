import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const RootComponent = defineComponent({
  name: 'VueCalculator',
  data() {
    return {
      counter: 0,
    }
  }
});

const app = createApp(RootComponent);
const vm = app.mount('#app');
