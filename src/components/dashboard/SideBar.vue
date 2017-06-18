<template lang="html">
  <el-menu :default-active="activeRoute" class="SideBar" @select="onMenuSelect">
    <el-menu-item index="my-resources">
      <i class="el-icon-menu"></i>
      Dashboard
    </el-menu-item>
    <el-menu-item index="profile">
      <i class="fa fa-user" style="margin-right:10px;"></i>
      Perfil
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    onMenuSelect(name) {
      this.$router.push({ name });
    },
  },
  computed: {
    activeRoute() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="scss">
.SideBar {
  display: none;

  @media (min-width: 640px) {
    display: block;
    height: calc(100vh - 60px);
    position: fixed;
    width: 200px;
    border-right: 2px solid #e0e0e0;
  }
}
</style>
