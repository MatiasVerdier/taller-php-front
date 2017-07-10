<template lang="html">
  <el-row class="note-list flex-container">
    <el-col :xs="24" :sm="12" v-for="note in notes" class="flex-item">
      <note-item :note="note"></note-item>
    </el-col>
  </el-row>
</template>

<script>
import NoteItem from './NoteItem';

export default {
  props: {
    notes: { type: Array, default: [] },
  },
  components: {
    NoteItem,
  },
};
</script>

<style lang="scss">
</style>
