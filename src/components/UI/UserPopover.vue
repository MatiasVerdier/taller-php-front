<template>
  <el-popover placement="top" trigger="hover" @show="getUserInfo">
    <gravatar :email="user.email" :size="36" slot="reference"></gravatar>

    <el-card>
      <div class="user-info">
        <gravatar :email="user.email" :size="60"></gravatar>

        <h3>{{ user.username }}</h3>

        <template v-if="lookingUser">
          <el-button :plain="true" v-if="currentUser.id !== user.id" :type="followButtonType">
            {{ followButtonText }}
          </el-button>

          <div class="extra-info">
            <span>Seguidores {{ followers }}</span>
            <span>Siguiendo {{ following }}</span>
            <span>Recursos {{ lookingUser.resources }}</span>
          </div>
        </template>
      </div>
    </el-card>
  </el-popover>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['currentUser', 'currentUserFollowing', 'lookingUser']),
    isFollowing() {
      return this.currentUserFollowing.indexOf(this.user.id) !== -1;
    },
    followButtonText() {
      return this.isFollowing ? 'Dejar de Seguir' : 'Seguir';
    },
    followButtonType() {
      return this.isFollowing ? 'danger' : 'success';
    },
    followers() {
      return this.lookingUser.followers ? this.lookingUser.followers.length : 0;
    },
    following() {
      return this.lookingUser.following ? this.lookingUser.following.length : 0;
    },
  },
  methods: {
    ...mapActions(['getPublicUserInfo']),
    getUserInfo() {
      this.getPublicUserInfo(this.user.id);
    },
  },
};
</script>

<style lang="scss">
.el-popover {
  padding: 0;
  border: none;
}

.user-info {
  text-align: center;
  min-width: 200px;

  .extra-info {
    padding: 10px 0;
  }

  h3 {
    font-size: 1.2em;
    font-weight: bold;
    margin: 10px 0;
  }
}
</style>
