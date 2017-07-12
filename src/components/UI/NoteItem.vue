<template lang="html">
  <el-card class="note-item">
    <el-button v-if="isOwner" class="note-delete"type="danger" icon="delete" @click="removeNote"></el-button>
    <div v-html="compiledBody" class="editor-preview visible"></div>
  </el-card>
</template>

<script>
import marked from 'marked';
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    note: { type: Object, required: true },
  },
  computed: {
    ...mapGetters(['currentUser']),
    compiledBody() {
      return marked(this.note.body, { sanitize: true });
    },
    isOwner() {
      return this.currentUser && this.currentUser.id === this.note.id;
    },
  },
  methods: {
    ...mapActions(['removeNoteFromResource']),
    removeNote() {
      this.$confirm('Esta seguro que desea borrar la nota', 'Confirmacion', {
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
        type: 'warning',
      }).then(() => {
        this.removeNoteFromResource(this.note);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.note-item {
  flex: 1 0 auto;
  position: relative;

  .note-delete {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 10;
  }
}
</style>
