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
      <a href="#" @click.prevent="goBack">Volver</a>

      <div class="actions-container">
        <h1 class="title">{{ currentResource.title }}</h1>

        <template v-if="isOwner">
          <el-button type="danger" class="delete-button" icon="delete" @click="dialogVisible = true">Eliminar</el-button>
          <el-button type="primary" class="edit-button" icon="edit">Editar</el-button>
        </template>
      </div>

      <div class="body">
        <template v-if="currentResource.type === 'LINK'">
          <el-row>
            <el-col :x2="20" :sm="18" :md="14">
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
          <markdown-editor :value="currentResource.markdown" :isEditing="false"></markdown-editor>
        </template>

        <template v-else="currentResource.type === 'CODE'">
          <code-editor :code="currentResource.code" :language="currentResource.code_type"></code-editor>
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
    id: {
      required: true,
    },
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
    goBack() {
      this.$router.go(-1);
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
  }

  .title {
    font-size: 2em;
    display: inline-block;
  }

  .loading {
    min-height: 40vh;
  }

  .edit-button, .delete-button {
    float: right;
  }
  .edit-button {
    margin-right: 20px;
  }
}
</style>
