 <template>
  <UiToastList v-if="toasts.length" :toasts="toasts" @timeout="removeToast" />
</template>

<script>
import UiToastList from './UiToastList.vue';

export default {
  name: 'TheToaster',

  data() {
    return {
      toasts: [],
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
        message: msg,
        type: type,
        icon: icon,
        id: Date.now() + Math.random(),
      })
    },
    removeToast(id) {
      this.toasts.splice((this.toasts.indexOf(this.toasts.find(toast => toast.id === id))), 1);
    }
  },

  components: { UiToastList },
};
</script>

<style scoped>
</style>
