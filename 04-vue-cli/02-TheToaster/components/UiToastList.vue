<template>
  <div class="toasts">
    <UiToast
      v-for="toast in toasts"
      :key="toast.id"
      :id="toast.id"
      :icon="toast.icon"
      :message="toast.message"
      :type="toast.type"
      @timeout="timeout(toast.id)"
    />
  </div>
</template>

<script>
import UiToast from './UiToast.vue';

export default {
  name: 'UiToastList',

  props: {
    toasts: {
      type: Array,
      required: true,
    }
  },

  components: { UiToast },

  methods: {
    timeout(id) {
      this.$emit('timeout', id)
    }
  },

  emits: ['timeout'],
}
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
