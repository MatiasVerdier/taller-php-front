<template lang="html">
  <div class="resource-image" v-bind:style="{ backgroundImage: `url(${linkImage})`, width: `${width}`, height: `${height}` }"></div>
</template>

<script>
import GeoPattern from 'geopattern';

export default {
  props: {
    resource: {
      type: Object,
      required: true,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '400px',
    },
  },
  computed: {
    linkImage() {
      return this.resource.link_image || GeoPattern.generate(this.resource.title).toDataUri();
    },
  },
};
</script>

<style lang="scss" scoped>
.resource-image {
  background-position: center;
  background-size: cover;
}
</style>
