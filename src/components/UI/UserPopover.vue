<template>
  <el-popover placement="top" trigger="click" @show="getUserInfo">
    <gravatar :email="user.email" :size="36" slot="reference"></gravatar>

    <el-card>
      <div class="user-info">
        <gravatar :email="user.email" :size="60"></gravatar>

        <h3>{{ user.username }}</h3>

        <template v-if="lookingUser">
          <el-button :plain="true" v-if="currentUser.id !== user.id" :type="followButtonType" @click="changeFollowing">
            {{ followButtonText }}
          </el-button>

          <el-row class="extra-info">
            <el-col :span="8" class="info-block">
              <div class="info-label">
                <span>Seguidores</span>
              </div>
              <div class="info-value">{{ followers }}</div>
            </el-col>

            <el-col :span="8" class="info-block">
              <div class="info-label">
                <span>Siguiendo</span>
              </div>
              <div class="info-value">{{ following }}</div>
            </el-col>

            <el-col :span="8" class="info-block">
              <div class="info-label">
                <span>Recursos Públicos</span>
              </div>
              <div class="info-value">{{ lookingUser.resources }}</div>
            </el-col>
          </el-row>
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
      return this.lookingUser.followersCount;
    },
    following() {
      return this.lookingUser.followingCount;
    },
  },
  methods: {
    ...mapActions(['getPublicUserInfo', 'followUser', 'unfollowUser']),
    getUserInfo() {
      this.getPublicUserInfo(this.user.id);
    },
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

  .info-block {
    .info-label {
      height: 30px;
      line-height: 30px;

      span {
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
      }
    }

    .info-value {
      font-size: 1.4em;
      font-weight: bold;
      margin-top: 5px;
    }
  }

  h3 {
    font-size: 1.2em;
    font-weight: bold;
    margin: 10px 0;
  }
}
</style>
