<template lang="html">
  <div class="profile">
    <el-row class="profile-content">
      <el-col :span="24" class="profile-info flex-container">
        <el-col :xs="24" :sm="12" :md="6" class="flex-item">
          <gravatar :email="currentUser.email" :size="150" class="mobile-center"></gravatar>
        </el-col>
        <el-col :xs="24" :sm="12" :md="18" class="flex-item">
          <ul class="profile-data mobile-center">
            <li class="data-item">
              Usuario: {{ currentUser.username }}
            </li>

            <li class="data-item">
              Email: {{ currentUser.email }}
            </li>

            <li class="data-item">
              Recursos: {{ resourceCount }}
            </li>

            <li class="data-item">
              Seguidores: {{ followers.length }}
            </li>

            <li class="data-item">
              Siguiendo: {{ following.length }}
            </li>
          </ul>
        </el-col>
      </el-col>

      <el-col :span="24" class="profile-relations">
        <el-tabs v-model="activeTab">
          <el-tab-pane name="followers" label="Seguidores">
            <user-list :users="followers"></user-list>
          </el-tab-pane>

          <el-tab-pane name="following" label="Siguiendo">
            <user-list :users="following"></user-list>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  mounted() {
    this.getUserProfile();
  },
  data() {
    return {
      activeTab: 'followers',
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
    ...mapState({
      followers: (state) => {
        const followers = state.currentUserProfile ? state.currentUserProfile.followers : [];
        return followers;
      },
      following: (state) => {
        const following = state.currentUserProfile ? state.currentUserProfile.following : [];
        return following;
      },
      resourceCount: (state) => {
        const count = state.currentUserProfile ? state.currentUserProfile.resources : 0;
        return count;
      },
    }),
  },
  methods: {
    ...mapActions(['getUserProfile']),
  },
};
</script>

<style lang="scss">
.profile {
  padding: 0 20px;

  .profile-content {
  }
  .profile-data {
    .data-item {
      margin-bottom: 12px;
    }
  }

  .mobile-center {
    @media (max-width: 640px) {
      text-align: center;
    }

    text-align: left;
  }

  .profile-info, .profile-detaiils {
    padding: 20px;
  }
}
</style>
