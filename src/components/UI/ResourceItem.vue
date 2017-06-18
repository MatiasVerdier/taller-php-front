<template lang="html">
  <el-card class="card-resource" v-bind:class="cardTypeClass" @click.native="showResource">
    <div class="flag">{{ resource.type | capitalize }}</div>

    <div class="resource-content">
      <template v-if="resource.type === 'LINK'">
        <div class="link-image" v-bind:style="{ backgroundImage: `url(${linkImage})` }"></div>

        <h2 class="title">
          {{ resource.title }}
        </h2>
      </template>

      <template v-else-if="resource.type === 'MARKDOWN'">
        <h2 class="title">
          {{ resource.title }}
        </h2>

        <markdown-editor :value="resource.markdown" :isEditing="false" :isSmall="true"></markdown-editor>
      </template>

      <template v-else="resource.type === 'CODE'">
        <h2 class="title">
          {{ resource.title }}
        </h2>

        {{ resource.code }}
      </template>
    </div>

    <div class="resource-owner">
      <gravatar :email="resource.owner.email" :size="36"></gravatar>
    </div>

    <div class="resource-actions">
      <div class="link-href" v-if="resource.type === 'LINK'">
        <a :href="resource.link" @click.stop="" target="_blank" rel="noopener">
          Visitar sitio
          <i class="fa fa-external-link" aria-hidden="true" style="font-size: 13px;"></i>
        </a>
      </div>

    </div>

  </el-card>
</template>

<script>
import GeoPattern from 'geopattern';

export default {
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  computed: {
    cardTypeClass() {
      return `type-${this.resource.type.toLowerCase()}`;
    },
    linkImage() {
      return this.resource.link_image || GeoPattern.generate(this.resource.title).toDataUri();
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

  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    cursor: pointer;
  }

  &.type-markdown, &.type-code {
    .resource-content {
      height: $content-height - 20px;
      margin-top: 20px;
    }

    .title {
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
    font-size: 20px;
    color: #2c3e50;
    margin-top: 10px;
  }

  .resource-actions {
    position: absolute;
    bottom: $card-padding;
    height: 40px;
    width: calc(100% - 40px);
    line-height: 40px;
  }

  .resource-owner {
    position: absolute;
    top: 10px;
    right: 10px;

    .gravatar {
      margin: 0;
    }
  }
}
</style>
