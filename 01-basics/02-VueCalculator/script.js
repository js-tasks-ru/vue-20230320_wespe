import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const RootComponent = defineComponent({
  name: 'CounterButton',
  data() {
    return {
      firstValue: 0,
      secondValue: 0,
      operator: undefined
    }
  },
  computed: {
    result() {
      return this.operator === 'sum' ? this.firstValue + this.secondValue :
             this.operator === 'subtract' ? this.firstValue - this.secondValue :
             this.operator === 'multiply' ? this.firstValue * this.secondValue :
             this.operator === 'divide' ? this.firstValue / this.secondValue :
             '';
    }
  },
});

const app = createApp(RootComponent);
const vm = app.mount('#app');
