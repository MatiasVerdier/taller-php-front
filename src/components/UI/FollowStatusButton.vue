<template lang="html">
  <el-button :plain="true" v-if="currentUser.id !== user.id" :type="followButtonType" @click="changeFollowing">
    {{ followButtonText }}
  </el-button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    user: { type: Object, required: true },
  },
  computed: {
    ...mapGetters(['currentUser', 'currentUserFollowing']),
    isFollowing() {
      return this.currentUserFollowing.indexOf(this.user.id) !== -1;
    },
    followButtonText() {
      return this.isFollowing ? 'Dejar de Seguir' : 'Seguir';
    },
    followButtonType() {
      return this.isFollowing ? 'danger' : 'success';
    },
  },
  methods: {
    ...mapActions(['followUser', 'unfollowUser']),
    changeFollowing() {
      if (this.isFollowing) {
        this.unfollowUser({ user_id: this.user.id });
      } else {
        this.followUser({ user_id: this.user.id });
      }
    },
  },
};
</script>

<style lang="scss">
</style>
