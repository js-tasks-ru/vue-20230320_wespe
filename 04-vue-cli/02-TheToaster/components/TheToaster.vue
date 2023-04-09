 <template>
  <UiToastList v-if="toasts.length" :toasts="toasts" />
</template>

<script>
import UiToastList from './UiToastList.vue';

export default {
  name: 'TheToaster',

  data() {
    return {
      toasts: [],
      timerCount: 0,
      toastLiveTime: 5000,
    }
  },

  methods: {
    error(msg) {
      this.addToast(msg, 'error', 'alert-circle')
    },
    success(msg) {
      this.addToast(msg, 'success', 'check-circle')
    },
    addToast(msg, type, icon) {
      this.toasts.push({
        toastMessage: msg,
        toastType: type,
        toastIcon: icon,
        toastShowTime: this.timerCount,
        toastHideTime: this.timerCount + this.toastLiveTime,
      })
    },
    startTimer() {
      setInterval(() => {
        this.timerCount+=100;

        this.toasts.forEach((item, i) => {
          if (this.timerCount > item.toastHideTime) {
              this.toasts.splice(i, 1);
          }
        });
      }, 100);
    },
  },

  mounted() {
    this.startTimer();
  },

  components: { UiToastList },
};
</script>

<style scoped>
</style>
