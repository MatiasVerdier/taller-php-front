<template lang="html">
  <div class="Explore">
    <Resource-list :resources="resources"></Resource-list>
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
  padding: 20px;
  height: calc(100vh - 60px);
}
</style>
