<template lang="html">
  <el-card class="card-resource" v-bind:class="cardTypeClass">
    <div class="flag">{{ flagText }}</div>

    <div class="resource-content">
      <template v-if="resource.type === 'LINK'">
        <resource-image :resource="resource" height="150px"></resource-image>

        <div class="title-container">
          <visibility-indicator :status="resource.visibility"></visibility-indicator>
          <span @click="showResource" class="title">{{ resource.title }}</span>
        </div>
      </template>

      <template v-else-if="resource.type === 'MARKDOWN'">
        <div class="title-container">
          <visibility-indicator :status="resource.visibility"></visibility-indicator>
          <span @click="showResource" class="title">{{ resource.title }}</span>
        </div>

        <markdown-editor :value="resource.markdown" :isEditing="false" :isSmall="true"></markdown-editor>
      </template>

      <template v-else="resource.type === 'CODE'">
        <div class="title-container">
          <visibility-indicator :status="resource.visibility"></visibility-indicator>
          <span @click="showResource" class="title">{{ resource.title }}</span>
        </div>

        <code-editor :code="resource.code" height="140px" :controls="false" :language="resource.code_type"></code-editor>
      </template>
    </div>

    <div class="resource-owner">
      <user-popover :user="resource.owner"></user-popover>
    </div>

    <div class="resource-actions">
      <a class="link-href" v-if="resource.type === 'LINK'" :href="resource.link" @click.stop="" target="_blank" rel="noopener">
        Visitar sitio
        <i class="fa fa-external-link" aria-hidden="true" style="font-size: 13px;"></i>
      </a>

      <div class="action-buttons" v-if="currentUser">
        <router-link v-if="currentUser.id === resource.owner.id" :to="{ name: 'edit', params: {id: resource.id, editing: true} }" class="action-edit">
          <i class="fa fa-pencil" ></i>
        </router-link>

        <span class="action-delete" v-if="currentUser.id === resource.owner.id">
          <i class="fa fa-trash" ></i>
        </span>

        <span class="action-like">
          <i class="fa fa-heart-o"></i> <span v-show="resource.likes > 0">{{ resource.likes }}</span>
        </span>
      </div>
    </div>

  </el-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['currentUser']),
    cardTypeClass() {
      return `type-${this.resource.type.toLowerCase()}`;
    },
    flagText() {
      let newValue = this.resource.type.toString().toLowerCase();
      newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
      return this.resource.type === 'CODE' ? 'Snippet' : newValue;
    },
  },
  methods: {
    showResource() {
      this.$router.push({
        name: 'show',
        params: {
          id: this.resource.id,
        },
      });
    },
  },
};
</script>

<style lang="scss">
$content-height: 200px;
$card-height: $content-height + 50px;
$card-padding: 20px;

$text-color: #2c3e50;
$hover-color: #2980b9;

.card-resource {
  flex: 1 0 auto;
  position: relative;
  box-shadow: none;

  &.el-card {
    overflow: initial;
  }

  .el-card__body {
    position: relative;
    height: $card-height;
  }

  .el-card__header {
    padding: 10px;
    color: #ecf0f1;
    border: none;
  }

  .flag {
    display: block;
    padding: 5px 12px 5px 16px;
    position: absolute;
    border-radius: 0 3px 3px 0;
    font-size: 14px;
    top: 1rem;
    left: -0.2em;
    color: #fff;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
    z-index: 9;
    letter-spacing: 0.05em;
    background-color: #50bcb6;
  }

  &.type-link {
    .flag {
      background-color: #2980b9;
    }
  }
  &.type-markdown {
    .flag {
      background-color: #16a085;
    }
  }
  &.type-code {
    .flag {
      background-color: #d35400;
    }
  }

  &.type-markdown, &.type-code {
    .resource-content {
      height: $content-height - 20px;
      margin-top: 20px;
    }

    .title-container {
      margin-bottom: 10px;
    }
  }

  .resource-content {
    height: $content-height;
    overflow: hidden;

    .link-image {
      min-height: 150px;
      background-position: center;
      background-size: cover;
    }
  }

  .title {
    color: $text-color;

    &:hover {
      cursor: pointer;
      color: $hover-color;
    }
  }

  .title-container {
    font-size: 20px;
    margin-top: 10px;
  }

  .resource-actions {
    position: absolute;
    bottom: $card-padding;
    height: 40px;
    width: calc(100% - 40px);
    line-height: 40px;

    .action-buttons {
      display: inline-block;
      float: right;

      &:hover {
        cursor: pointer;
      }

      i {
        margin-left: 10px;
      }

      .action-like {
        span {
          font-size: 0.8em;
          position: relative;
          top: -2px;
          left: -2px;
        }
        &:hover {
          color: #ff4949;
        }
      }

      .action-delete:hover {
        color: $hover-color;
      }

      .action-edit {
        color: $text-color;

        &:hover {
          color: $hover-color;
        }
      }
    }
  }

  .resource-owner {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;

    .gravatar {
      margin: 0;
    }
  }
}
</style>
