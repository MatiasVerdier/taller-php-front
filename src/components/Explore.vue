<template lang="html">
  <div class="Explore">

    <resource-create-buttons></resource-create-buttons>

    <el-row type="flex" justify="center">
      <el-col :span="24">
        <resource-list :resources="resources"></resource-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  mounted() {
    this.getResources();
  },
  methods: {
    ...mapActions(['getResources']),
  },
  computed: {
    ...mapGetters(['resources']),
  },
};
</script>

<style>
.Explore {
  padding: 0 20px;
  height: calc(100vh - 60px);
}
</style>
