<template lang="html">
  <div class="Explore">
    <el-row class="flex-container">
      <el-col :xs="24" :sm="12" :lg="6" v-for="resource in resources" class="flex-item" :key="resource.id">
        <resource-item :resource="resource"></resource-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ResourceItem from './dashboard/resources/ResourceItem';

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
  components: {
    ResourceItem,
  },
};
</script>

<style>
.Explore {
  padding: 20px;
  height: calc(100vh - 60px);
}
</style>
