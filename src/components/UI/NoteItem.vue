<template lang="html">
  <el-card class="note-item">
    <div v-html="compiledBody" class="editor-preview"></div>
  </el-card>
</template>

<script>
import marked from 'marked';

export default {
  props: {
    note: { type: Object, required: true },
  },
  computed: {
    compiledBody() {
      return marked(this.note.body, { sanitize: true });
    },
  },
};
</script>

<style lang="scss" scoped>
.note-item {
  flex: 1 0 auto;
}
</style>
