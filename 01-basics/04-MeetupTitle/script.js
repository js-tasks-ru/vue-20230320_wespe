import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

const RootComponent = defineComponent({
  name: 'MeetupTitles',
  data() {
    return {
      chosenRadio: '',
      meetupTitle: '',
    }
  },
  watch: {
    async chosenRadio(newVal) {
      this.meetupTitle = '';
      this.meetupTitle = await this.fetchMeetupById(newVal).then(res => res.title);
    }
  },
  methods: {
    fetchMeetupById(meetupId) {
      return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw error;
          });
        }
      });
    },
  }
});

const app = createApp(RootComponent);
const vm = app.mount('#app');

// Требуется создать Vue приложение
