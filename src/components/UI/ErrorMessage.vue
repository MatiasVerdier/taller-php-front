<template lang="html">
  <el-alert
    :title="title"
    type="error"
    :description="message"
    show-icon>
  </el-alert>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Ocurrio un error' },
    message: { type: String, default: '' },
  },
};
</script>

<style lang="scss">
</style>
