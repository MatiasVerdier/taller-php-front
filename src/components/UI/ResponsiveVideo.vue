<template lang="html">
  <div class="videoWrapper">
    <template v-if="isYoutube">
      <iframe :src="embedUrl" frameborder="0" allowfullscreen></iframe>
    </template>
    <template v-else>
      <iframe :src="url" frameborder="0" allowfullscreen></iframe>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    isYoutube() {
      return this.url.indexOf('youtube.com') !== -1;
    },
    videoId() {
      return this.isYoutube ? this.url.split('v=')[1] : '';
    },
    embedUrl() {
      return this.isYoutube ? `https://www.youtube.com/embed/${this.videoId}` : '';
    },
  },
};
</script>

<style lang="scss">
.videoWrapper {
	position: relative;
	padding-bottom: 56.25%; /* 16:9 */
	padding-top: 25px;
	height: 0;
}
.videoWrapper iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
