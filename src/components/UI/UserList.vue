<template lang="html">
  <div>
    <el-row v-if="users.length === 0">
      <el-col :span="24">
        <p>No hay usuarios</p>
      </el-col>
    </el-row>
    <el-row class="flex-container">
      <el-col :xs="24" :sm="12" :md="8" v-for="user in users" class="flex-item" :key="user.id">
        <el-card>
          <el-row>
            <el-col :span="24" style="text-align: center; margin-bottom: 20px;">
              <gravatar :email="user.email" style="display: block;"></gravatar>
              <span>{{ user.username }}</span>
            </el-col>

            <el-col :span="24" style="text-align: center;">
              <follow-status-button :user="user"></follow-status-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
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
