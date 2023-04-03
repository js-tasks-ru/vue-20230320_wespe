import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  methods: {
    increase(value) {
      return value + 1
    }
  },

  template: `<button :value="count" @click="$emit('update:count', increase(count))" type="button">{{ count }}</button>`,
});
