<template lang="html">
  <el-row class="my-resources">

    <resource-create-buttons></resource-create-buttons>

    <el-col :span="24">
      <el-tabs value="my-resources">
        <el-tab-pane :label="tabsLabels.myResources" name="my-resources">
          <resource-list :resources="myResources"></resource-list>
        </el-tab-pane>

        <el-tab-pane :label="tabsLabels.sharedWithMe" name="shared-with-me">
          <resource-list :resources="sharedWithMe"></resource-list>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  mounted() {
    if (this.currentUser) {
      this.getMyResources(this.currentUser.id);
    }

    this.$watch('currentUser', (user) => {
      if (user) {
        this.getMyResources(user.id);
      }
    });
  },
  methods: {
    ...mapActions(['getMyResources']),
  },
  computed: {
    ...mapGetters(['currentUser', 'myResources', 'sharedWithMe']),
    tabsLabels() {
      return {
        myResources: `Mis Recursos (${this.myResources.length})`,
        sharedWithMe: `Compartidos conmigo (${this.sharedWithMe.length})`,
      };
    },
  },
};
</script>

<style lang="scss">
  .my-resources {
    padding: 0 20px;
    margin-bottom: 20px;
  }

  .flex-container {
    display: flex;
    flex-wrap: wrap;

    .flex-item {
      display: flex;
      padding: 0.5em;
      flex-direction: column;
    }
  }


</style>
