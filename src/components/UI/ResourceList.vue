<template lang="html">
  <div class="resource__list">
    <el-row v-if="!isLoading && !resources.length">
      <el-col :span="24">
        <slot name="empty-content">
          <div class="empty-container">
            <h2 class="empty-content-title">No hay recursos para mostrar</h2>
          </div>
        </slot>
      </el-col>
    </el-row>

    <el-row class="flex-container" v-if="!isLoading">
      <el-col :xs="24" :sm="12" :lg="6" v-for="resource in resources" class="flex-item" :key="resource.id"
        v-show="filteredResources.indexOf(resource) !== -1">
        <resource-item :resource="resource"></resource-item>
      </el-col>
    </el-row>

    <div v-show="isLoading" class="loading" v-loading="isLoading" element-loading-text="Cargando"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ResourceItem from './ResourceItem';

export default {
  props: {
    resources: {
      type: Array,
      required: true,
      default: [],
    },
  },
  computed: {
    ...mapGetters(['isLoading', 'searchFilter']),
    filteredResources() {
      return this.resources.filter((resource) => {
        const regex = new RegExp(this.searchFilter, 'i');
        return resource.title.match(regex);
      });
    },
  },
  components: {
    ResourceItem,
  },
};
</script>

<style lang="scss">
  .empty-container {
    text-align: center;
  }
  .empty-content-title {
    font-size: 3em;
    padding: 10px 0;
  }
</style>
