import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  computed: {
    style() {
      return { "--bg-url": this.image ? `url('${this.image}')` : "" };
    },
  },

  props: {
    image: {
      type: String,
    },
    title: {
      type: String,
    },
  },

  template: `
    <div class="meetup-cover" :style="style">
        <!-- Ссылка выше - пример верстки при наличии изображения, а не изображение по умолчанию. -->
        <!-- Изображение по умолчанию уже есть в стилях. Для его вывода достаточно не добавлять никаких стилей. -->
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
