<template lang="html">
  <el-menu :default-active="activeRoute" class="SideBar" @select="onMenuSelect">
    <el-menu-item index="my-resources" v-if="currentUser">
      <i class="el-icon-menu"></i>
      Dashboard
    </el-menu-item>

    <el-menu-item index="profile" v-if="currentUser">
      <i class="fa fa-user" style="margin-right:10px;"></i>
      Perfil
    </el-menu-item>

    <div class="el-menu-item">
      <el-input
        placeholder="Buscar recurso"
        :icon="searchIcon"
        v-model="searchFilter"
        :on-icon-click="handleIconClick"
        @change="onFilterChange">
      </el-input>
    </div>

    <el-menu-item index="logout" class="logout-menu" v-if="currentUser">
      <i class="fa fa-sign-out" style="margin-right:10px;"></i>
      Salir
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    ...mapActions(['logout', 'updateSearchFilter']),
    onMenuSelect(name) {
      if (name === 'logout') {
        this.logout();
        this.$router.push({ name: 'login' });
      } else {
        this.$router.push({ name });
      }
    },
    handleIconClick() {
      if (this.searchIcon === 'close') {
        this.searchFilter = '';
      }
    },
    onFilterChange(value) {
      this.updateSearchFilter(value);
    },
  },
  computed: {
    ...mapGetters(['currentUser', 'searchFilter']),
    activeRoute() {
      return this.$route.name;
    },
    searchIcon() {
      return this.searchFilter === '' ? 'search' : 'close';
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

  .logout-menu {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
</style>
