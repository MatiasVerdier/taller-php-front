<template lang="html">
  <div>
    <!-- Full Width Image Header -->
    <header class="header-image">
      <el-row type="flex" justify="center">
        <el-col :span="20" class="headline">
          <h1>Bienvenido a NombreApp!</h1>
          <h2>Manten tus recursos organizados y comparte</h2>

          <el-button type="primary" class="call-to-action" @click="goToLogin">Comienza ahora</el-button>
        </el-col>
      </el-row>
    </header>

    <!-- Page Content -->
    <div class="home-cards">

      <el-row class="home-row">
        <el-col>
          <h3 class="heading">Guarda tus recursos</h3>
        </el-col>
      </el-row>

      <el-row class="home-row">
        <el-col :xs="20" :sm="20" :md="7">
          <el-card :body-style="{ padding: '0px' }" class="home-card">
            <img src="/static/links.jpg" class="image">
            <div class="card-overlay">
              <h2>Sitios Web</h2>
            </div>
          </el-card>
        </el-col>

        <el-col :xs="20" :sm="20" :md="7">
          <el-card :body-style="{ padding: '0px' }" class="home-card">
            <img src="/static/markdown.png" class="image">
            <div class="card-overlay">
              <h2>Documentos Markdown</h2>
            </div>
          </el-card>
        </el-col>

        <el-col :xs="20" :sm="20" :md="7">
          <el-card :body-style="{ padding: '0px' }" class="home-card">
            <img src="/static/snippets.jpg" class="image">
            <div class="card-overlay">
              <h2>Snippets de Código</h2>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style lang="scss" scoped>

.header-image {
  display: block;
  width: 100%;
  text-align: center;
  background: url('/static/background.png') no-repeat center center scroll;
  background-size: cover;
}

.headline {
  padding: 3em 0;
  color: #ecf0f1;
  text-shadow: rgba(43, 45, 46, 0.8) 3px 5px 7px;

  h1 {
    font-size: 2.6em;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 1.3em;
  }

  .call-to-action {
    font-size: 2em;
    margin-top: 2em;
  }

  @media (min-width: 1024px) {
    & {
      padding: 5em 0;
    }

    h1 {
      font-size: 6em;
    }

    h2 {
      font-size: 3.5em;
    }
  }
}
.heading {
  font-size: 2em;
  text-align: center;
}
.image {
  width: 100%;
  display: block;
}
.home-row {
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (min-width: 1024px) {
    justify-content: space-around;
  }
}
.home-cards {
  margin: 50px 0;
}

.home-card {
  margin-bottom: 20px;
  position: relative;

  .card-overlay {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    transition: all .3s ease-in-out;

    &:hover {
      background-color: rgba(20, 20, 20, 0.6);

      h2 {
        opacity: 1;
      }
    }

    h2 {
      opacity: 0;
      text-align: center;
      font-size: 2em;
      color: white;
      text-transform: uppercase;
      transition: all .3s ease-in-out;
    }
  }
}
</style>
