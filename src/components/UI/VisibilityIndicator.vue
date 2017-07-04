<template lang="html">
  <span class="visibility-indicator">
    <i class="fa fa-globe" aria-hidden="true" v-if="status === 'PUBLIC'"></i>
    <i class="fa fa-users" aria-hidden="true" v-if="status === 'SHARED'"></i>
    <i class="fa fa-shield" aria-hidden="true" v-if="status === 'PRIVATE'"></i>
  </span>
</template>

<script>
export default {
  props: {
    status: { type: String, required: true },
  },
};
</script>

<style lang="scss" scoped>
  .visibility-indicator {
    margin-right: 10px;
  }
</style>
