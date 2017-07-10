<template lang="html">
  <div class="resource-details">

    <error-message v-show="permissionError" message="No esta autorizado para ver este recurso"></error-message>

    <el-dialog
      title="Confirmar acción"
      :visible.sync="dialogVisible"
      size="tiny">
      <span class="dialog-message" style="font-size: 30px;">
        Esta seguro que desea eliminar este elemento?
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancelar</el-button>
        <el-button type="danger" @click="confirmDelete" icon="delete">Eliminar</el-button>
      </span>
    </el-dialog>

    <el-form class="content" v-if="!isLoading && currentResource" :model="currentEditingResource" :rules="rules" ref="resourceEditForm">
      <a href="#" @click.prevent="backToList" v-show="!editing">Volver al listado</a>

      <div class="actions-container">
        <h1 class="title">
          <visibility-indicator :status="currentResource.visibility" v-if="!editing"></visibility-indicator>
          <span v-show="!editing">{{ currentResource.title }}</span>

          <el-form-item prop="title" v-if="editing">
            <el-input placeholder="Título" v-model="currentEditingResource.title">
              <el-select v-model="currentEditingResource.visibility" slot="prepend" placeholder="Visibilidad">
                <el-option label="Público" value="PUBLIC"></el-option>
                <el-option label="Compartido" value="SHARED"></el-option>
                <el-option label="Privado" value="PRIVATE"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </h1>

        <template v-if="isOwner">
          <el-button type="danger" class="delete-button" icon="delete" @click="dialogVisible = true" v-if="!editing">Eliminar</el-button>
          <el-button type="primary" class="edit-button" icon="edit" @click="editResource" v-if="!editing">Editar</el-button>

          <el-button type="success" class="save-button" icon="check" @click="saveResource" v-if="editing">Guardar</el-button>
          <el-button class="cancel-button" v-if="editing" @click="goBack">Cancelar</el-button>
        </template>
      </div>

      <div class="body">
        <template v-if="currentResource.type === 'LINK'">
          <el-row>
            <el-col :xs="20" :sm="18" :md="14">
              <el-form-item class="link-input" prop="link" v-if="editing">
                <el-input placeholder="Link" v-model="currentEditingResource.link"></el-input>
              </el-form-item>

              <div class="resource-video" v-if="currentResource.link_type === 'video'">
                <responsive-video  :url="currentResource.link"></responsive-video>
              </div>
              <div class="resource-image" v-else>
                <resource-image :resource="currentResource"></resource-image>
              </div>
            </el-col>
          </el-row>
        </template>

        <el-form-item v-if="currentResource.type === 'MARKDOWN'" prop="markdown">
          <markdown-editor
            :value="currentEditingResource.markdown"
            :isEditing="editing"
            @input="onMarkdownInput"
          ></markdown-editor>
        </el-form-item>

        <el-form-item v-if="currentResource.type === 'CODE'" prop="code">
          <code-editor
            :code="currentEditingResource.code"
            :language="currentEditingResource.code_type"
            :isEditing="editing"
            @input="onCodeInput"
            @languageChange="onLanguageChange"
          ></code-editor>
        </el-form-item>
      </div>
    </el-form>

    <div v-show="isLoading" class="loading" v-loading="isLoading" element-loading-text="Cargando"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  mounted() {
    this.getResource(this.id);
  },
  props: {
    id: { type: [String, Number], required: true },
    editing: { type: Boolean, default: false },
  },
  data() {
    return {
      dialogVisible: false,
      rules: {
        title: [
          { required: true, message: 'Debe ingresar un título' },
          { min: 10, message: 'Debe contar con al menos 10 caracteres', trigger: 'blur' },
        ],
        link: [
          { required: true, message: 'Debe ingresar un link' },
          { type: 'url', message: 'Debe ser una url válida', trigger: 'blur' },
        ],
        markdown: [
          { required: true, message: 'Debe ingresar algún contenido' },
        ],
        code: [
          { required: true, message: 'Debe ingresar algún contenido' },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(['currentUser', 'currentResource', 'currentEditingResource', 'isLoading', 'currentError']),
    isOwner() {
      if (this.isLoading) return false;
      return this.currentResource.user_id === this.currentUser.id;
    },
    permissionError() {
      return this.currentError ? this.currentError.data.error === 'insufficient_permissions' : false;
    },
    errorMessage() {
    },
  },
  methods: {
    ...mapActions(['getResource', 'updateResource', 'deleteResource']),
    backToList() {
      this.$router.push({ name: 'my-resources' });
    },
    confirmDelete() {
      this.dialogVisible = false;
      this.deleteResource(this.currentResource.id);

      this.$message({
        message: 'El recurso se ha eliminado con exito',
        type: 'success',
      });

      this.$router.push({ name: 'my-resources' });
    },
    editResource() {
      this.$router.push({
        name: 'edit',
        params: {
          id: this.currentResource.id,
          editing: true,
        },
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    saveResource() {
      this.$refs.resourceEditForm.validate((valid) => {
        if (valid) {
          this.updateResource(this.currentEditingResource);
          if (this.currentResource.type === 'LINK') {
            const url = this.currentEditingResource.link;
            const { id } = this.currentResource;
            this.$store.dispatch('getLinkMetadata', { url, resourceId: id });
          }

          this.$message({
            message: 'El recurso se ha actualizado con exito',
            type: 'success',
          });

          this.goBack();
        }
      });
    },
    onMarkdownInput(value) {
      this.currentEditingResource.markdown = value;
    },
    onCodeInput(value) {
      this.currentEditingResource.code = value;
    },
    onLanguageChange(value) {
      this.currentEditingResource.code_type = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.resource-details {
  padding: 20px;

  .actions-container {
    margin: .5em 0;
  }

  .body {
    padding: 20px 0;

    .link-input {
      margin-bottom: 20px;
    }
  }

  .title {
    font-size: 2em;
    display: inline-block;
    min-width: 70%;

    .el-select {
      width: 130px;
    }

    .el-input-group {
      vertical-align: middle;
    }
  }

  .edit-button, .delete-button, .cancel-button, .save-button {
    float: right;
  }
  .edit-button, .cancel-button {
    margin-right: 20px;
  }
}
</style>
