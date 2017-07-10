<template lang="html">
  <el-row class="note-list flex-container">
    <el-col :span="24" v-if="notes.length === 0">
      <h2 class="empty-notes">No hay Notas para mostrar</h2>
    </el-col>
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

<style lang="scss" scoped>
.empty-notes {
  padding: 10px 20px;
  background-color: #858f95;
  font-size: 1.3em;
  color: white;
  width: 100%;
  max-width: 500px;
}
</style>
