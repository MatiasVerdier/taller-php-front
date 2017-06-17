<template lang="html">
  <el-row class="my-resources">

    <resource-create-buttons></resource-create-buttons>

    <el-col :span="24">
      <el-tabs value="my-resources">
        <el-tab-pane label="Mis Resursos" name="my-resources">
          <resource-list :resources="myResources"></resource-list>
        </el-tab-pane>

        <el-tab-pane label="Compartidos conmigo" name="shared-with-me">

        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ResourceCreateButtons from './ResourceCreateButtons';

export default {
  mounted() {
    this.$watch('currentUser', (user) => {
      if (user) {
        this.getMyResources(user.id);
      }
    });

    if (this.currentUser) {
      this.getMyResources(this.currentUser.id);
    }
  },
  methods: {
    ...mapActions(['getMyResources']),
  },
  computed: {
    ...mapGetters(['currentUser', 'myResources']),
  },
  components: {
    ResourceCreateButtons,
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
