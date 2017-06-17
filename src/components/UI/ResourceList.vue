<template lang="html">
  <el-row class="flex-container">
    <el-col :xs="24" :sm="12" :lg="6" v-for="resource in resources" class="flex-item" :key="resource.id">
      <resource-item :resource="resource"></resource-item>
    </el-col>
  </el-row>
</template>

<script>
import ResourceItem from './ResourceItem';

export default {
  props: {
    resources: {
      type: Array,
      required: true,
      default: [],
    },
  },
  components: {
    ResourceItem,
  },
};
</script>

<style lang="scss">
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
