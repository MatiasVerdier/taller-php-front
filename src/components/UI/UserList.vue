<template lang="html">
  <el-row class="flex-container">
    <el-col :xs="24" :sm="12" :md="8" v-for="user in users" class="flex-item" :key="user.id">
      <el-card>
        <el-row>
          <el-col :span="18">
            <gravatar :email="user.email"></gravatar>
            <span>{{ user.username }}</span>
          </el-col>

          <el-col :span="6">
            <el-button :plain="true" type="success" style="float: right;">
              Seguir
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: function () { // eslint-disable-line
        return [];
      },
    },
  },
};
</script>

<style lang="scss">
</style>
