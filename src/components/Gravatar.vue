<template>
  <div class="gravatar">
    <img :src="url" alt="avatar">
  </div>
</template>

<style>
  .gravatar {
    display: inline-block;
  }
  .gravatar img {
    border-radius: 50%;
    vertical-align: middle;
  }
</style>

<script>
import md5 from 'md5';

const ENDPOINT = 'https://www.gravatar.com/avatar/';

export default {
  props: {
    email: {
      type: String,
    },
    default: {
      type: String,
      default: 'identicon',
    },
    size: {
      type: Number,
      default: 40,
    },
  },
  data() {
    return {
      endpoint: ENDPOINT,
    };
  },
  computed: {
    url() {
      const hash = md5(this.email.trim());
      const size = `?s=${this.size}`;
      let defPicture = `&d=${this.default}`;

      if (this.default === 'gravatar') {
        defPicture = '';
      }

      return this.endpoint + hash + size + defPicture;
    },
  },
};
</script>
