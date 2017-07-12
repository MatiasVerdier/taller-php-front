<template lang="html">
  <nav class="main-navigation" role="navigation">
    <el-menu mode="horizontal" theme="dark" :default-active="activeRoute" @select="onMenuSelect">
      <div class="left-menu">
        <el-menu-item index="home">
          Home
        </el-menu-item>

        <el-menu-item index="explore">
          Explorar
        </el-menu-item>
      </div>

      <div class="right-menu">
        <template v-if="isAuthenticated">
          <el-menu-item v-if="currentUser" index="profile" class="el-menu-item user-menu">
            <gravatar :email="currentUser.email"></gravatar>
            <span class="user-name">{{ currentUser.username }}</span>
          </el-menu-item>
        </template>

        <el-menu-item v-else index="login">
          Login
        </el-menu-item>
      </div>
    </el-menu>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    onMenuSelect(name) {
      this.$router.push({ name });
    },
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    activeRoute() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu-item:hover {
  border-bottom: 5px solid #20a0ff;
}
.main-navigation {
  position: fixed;
  width: 100%;
  z-index: 100;
}
.right-menu {
  float: right;
}
.user-menu {
  padding: 0;
  width: 200px;

  .gravatar {
    margin-right: 20px;
    margin-left: 10px;
  }
}
.user-name {
  display: inline-block;
  margin-right: 20px;
}
</style>
