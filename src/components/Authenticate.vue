<template lang="html">
  <div class="Authenticate">
    <el-card class="login-card">
      <h2 slot="header">Entrar al sitio</h2>

      <el-form :model="form" :rules="rules" ref="loginForm">
        <div class="input-field">
          <el-alert
            v-show="loginError"
            :title="errorTitle"
            type="error"
            :description="errorDescription"
            show-icon
            :closable="true">
          </el-alert>
        </div>

        <el-form-item prop="username" v-if="!form.isLogin">
          <el-input
            v-if="!form.isLogin"
            size="large"
            v-model="form.username"
            placeholder="Tu nombre de usuario único"
            @keyup.native.enter="submitForm">
          </el-input>
        </el-form-item>

        <el-form-item prop="email">
          <el-input
            type="email"
            size="large"
            auto-complete="on"
            v-model="form.email"
            placeholder="Tu dirección de correo"
            @keyup.native.enter="submitForm">
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            size="large"
            v-model="form.password"
            placeholder="Tu contraseña super secreta"
            @keyup.native.enter="submitForm">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-row type="flex" justify="center">
            <el-button type="primary" v-bind:class="{ 'is-loading': isLoading}" @click="submitForm">
              <i v-show="isLoading" class="el-icon-loading"></i>
              {{buttonText}}
            </el-button>
          </el-row>
        </el-form-item>

        <el-row type="flex" justify="center">
          <div class="form-links">
            <a href="#" @click.prevent="form.isLogin = false" v-if="form.isLogin">No tienes cuenta?</a>
            <a href="#" @click.prevent="form.isLogin = true" v-else="form.isLogin">Ya tienes cuenta?</a>
          </div>
        </el-row>
      </el-form>

    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from '../store/mutation-types';

export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        isLogin: true,
      },
      rules: {
        email: [
          { type: 'email', message: 'Debe ser una dirección de correo válida', trigger: 'blur' },
          { required: true, message: 'El email es requerido' },
        ],
        password: [
          { required: true, message: 'Debe ingresar una contraseña' },
        ],
      },
    };
  },
  computed: {
    buttonText() {
      if (this.isLoading) {
        return 'Cargando';
      }
      return this.form.isLogin ? 'Entrar' : 'Crear cuenta';
    },
    errorTitle() {
      return this.form.isLogin ? 'Error de autenticacion' : 'Error al registrarse';
    },
    errorDescription() {
      const error = this.loginError ? this.loginError.error : '';
      let errorMessage = '';

      if (error === 'invalid_credentials') {
        errorMessage = 'El email y/o la contraseña son incorrectos';
      }

      return errorMessage;
    },
    ...mapGetters(['isLoading', 'loginError']),
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login();
        }
      });
    },
    login() {
      this.$store.dispatch('login', {
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
        isLogin: this.form.isLogin,
      })
      .then(({ data }) => {
        this.$store.commit(types.LOGIN_SUCCESS);
        localStorage.setItem('token', data);
        this.$router.push({ name: 'dashboard' });

        this.$store.dispatch('getUser').then((response) => {
          const user = response.data;
          this.$store.commit(types.GET_USER_SUCCESS, { user });
          localStorage.setItem('currentUser', JSON.stringify(user));
        });
      })
      .catch(error => this.$store.commit(types.LOGIN_FAILURE, error.response));
    },
  },
};
</script>

<style scoped>
.login-card {
  max-width: 350px;
  margin: 100px auto;
}
.input-field {
  margin-bottom: 20px;
}
.form-links {
  margin-top: 20px;
}
</style>
