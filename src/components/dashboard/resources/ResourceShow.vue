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

    <div class="content" v-if="!isLoading && currentResource">
      <a href="#" @click.prevent="backToList" v-show="!editing">Volver al listado</a>

      <div class="actions-container">
        <h1 class="title">
          <visibility-indicator :status="currentResource.visibility" v-show="!editing"></visibility-indicator>
          <span v-show="!editing">{{ currentResource.title }}</span>

          <el-input placeholder="Título" v-show="editing" v-model="currentResource.title">
            <el-select v-model="currentResource.visibility" slot="prepend" placeholder="Visibilidad">
              <el-option label="Público" value="PUBLIC"></el-option>
              <el-option label="Compartido" value="SHARED"></el-option>
              <el-option label="Privado" value="PRIVATE"></el-option>
            </el-select>
          </el-input>
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
              <div class="link-input">
                <el-input placeholder="Link" v-show="editing" v-model="currentResource.link"></el-input>
              </div>

              <div class="resource-video" v-if="currentResource.link_type === 'video'">
                <responsive-video  :url="currentResource.link"></responsive-video>
              </div>
              <div class="resource-image" v-else>
                <resource-image :resource="currentResource"></resource-image>
              </div>
            </el-col>
          </el-row>
        </template>

        <template v-else-if="currentResource.type === 'MARKDOWN'">
          <markdown-editor
            :value="currentResource.markdown"
            :isEditing="editing"
            @input="onMarkdownInput"
          ></markdown-editor>
        </template>

        <template v-else="currentResource.type === 'CODE'">
          <code-editor
            :code="currentResource.code"
            :language="currentResource.code_type"
            :isEditing="editing"
            @input="onCodeInput"
            @languageChange="onLanguageChange"
          ></code-editor>
        </template>
      </div>
    </div>

    <div v-else class="loading" v-loading="isLoading"></div>
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
    };
  },
  computed: {
    ...mapGetters(['currentUser', 'currentResource', 'isLoading', 'currentError']),
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
      this.updateResource(this.currentResource);
      this.backToShow();
    },
    onMarkdownInput(value) {
      this.currentResource.markdown = value;
    },
    onCodeInput(value) {
      this.currentResource.code = value;
    },
    onLanguageChange(value) {
      this.currentResource.code_type = value;
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

  .loading {
    min-height: 40vh;
  }

  .edit-button, .delete-button, .cancel-button, .save-button {
    float: right;
  }
  .edit-button, .cancel-button {
    margin-right: 20px;
  }
}
</style>
