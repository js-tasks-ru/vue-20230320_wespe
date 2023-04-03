import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  props: {
    meetupId: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      meetup: null,
      meetupDataLoading: false,
      meetupDataLoadingError: false,
      errorMessage: 'error',
    }
  },

  mounted() {
    this.getMeetup();
  },

  watch: {
    meetupId() {
      this.getMeetup()
    }
  },

  methods: {
    async getMeetup() {
      this.meetup = null;
      this.meetupDataLoading = true;
      this.meetupDataLoadingError = false;

      try {
        this.meetup = await fetchMeetupById(this.meetupId);
      } catch(e) {
        this.meetupDataLoadingError = true;
        this.errorMessage = e.message;
      } finally {
        this.meetupDataLoading = false;
      }
    }
  },

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  template: `
    <div class="page-meetup">
      <MeetupView v-if="meetup" :meetup="meetup" />

      <UiContainer v-if="meetupDataLoading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>

      <UiContainer v-if="meetupDataLoadingError">
        <UiAlert>{{ errorMessage }}</UiAlert>
      </UiContainer>
    </div>`,
});
