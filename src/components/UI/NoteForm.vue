<template lang="html">

  <el-form ref="noteForm" :model="note">
    <el-form-item prop="body">
      <el-tabs type="border-card">
        <el-tab-pane label="Editar">
          <el-input type="textarea" :rows="10" v-model="note.body" @change="onChange"></el-input>
        </el-tab-pane>

        <el-tab-pane label="Previzualizar">
          <div v-html="compiledBody" class="note-preview editor-preview visible"></div>
        </el-tab-pane>
      </el-tabs>
    </el-form-item>

    <el-form-item>
      <el-button @click="onCancel">Cancelar</el-button>
      <el-button type="primary" @click="onSubmit">Guardar</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import marked from 'marked';

export default {
  props: {
    text: { type: String, required: true },
  },
  data() {
    return {
      note: {
        body: this.text,
      },
    };
  },
  computed: {
    compiledBody() {
      return marked(this.note.body, { sanitize: true });
    },
  },
  methods: {
    onChange(newValue) {
      this.$emit('update:text', newValue);
    },
    onSubmit() {
      this.$emit('submit');
    },
    onCancel() {
      this.$refs.noteForm.resetFields();
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss">
.note-preview {
  min-height: 220px;
}
</style>
