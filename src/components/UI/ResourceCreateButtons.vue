<template lang="html">
  <div>
    <el-row>
      <el-col :span="24">
        <h1 class="create-title">Crear Recursos</h1>
      </el-col>
    </el-row>

    <el-row class="resource-create-buttons">
      <el-col :span="8">
        <router-link to="/dashboard/create/link">
          <el-card class="resource-type-card link">
            <h2>
              <i class="fa fa-globe"></i>
              Sitio Web
            </h2>
          </el-card>
        </router-link>
      </el-col>

      <el-col :span="8">
        <router-link to="/dashboard/create/markdown">
          <el-card class="resource-type-card markdown">
            <h2>
              <i class="fa fa-file-text"></i>
              Markdown
            </h2>
          </el-card>
        </router-link>
      </el-col>

      <el-col :span="8">
        <router-link to="/dashboard/create/code">
          <el-card class="resource-type-card code">
            <h2>
              <i class="fa fa-code"></i>
              Snippet
            </h2>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
.create-title {
  font-size: 1.3em;
  text-align: center;
  margin-top: 10px;
}
.resource-create-buttons {
  padding: 20px;
  display: flex;
  justify-content: center;

  div + div {
    margin-left: 20px;
  }

  .resource-type-card {
    text-align: left;
    box-shadow: none;
    color: #727c88;
    transition: all .2s ease-in-out;

    &:hover {
      color: white;
    }

    &.link:hover {
      background-color: #2980b9;
    }
    &.markdown:hover {
      background-color: #16a085;
    }
    &.code:hover {
      background-color: #d35400;
    }

    @media (min-width: 640px) {
      text-align: center;
    }

    .el-card__body {
      padding: 10px;

      @media (min-width: 640px) {
        padding: 10px 0;
      }
    }

    i {
      font-size: 1.2em;
      vertical-align: middle;
      margin-right: 10px;

      @media (min-width: 640px) {
        display: block;
        font-size: 2em;
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
