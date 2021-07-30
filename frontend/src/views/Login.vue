<template>
  <div class="login">
    <ConnectionHeader />
    <router-link to="/signup" class="connect">S'inscrire</router-link>
    <LoginForm />
  </div>
</template>

<script>
  // @ is an alias to /src
  import LoginForm from '@/forms/LoginForm';
  import ConnectionHeader from '@/headers/ConnectionHeader'

  export default {
    name: 'Login',
    components: {
      LoginForm,
      ConnectionHeader
    },
  }
</script>

<style>
  .connect {
    color: #fb340b;
    text-decoration: none;
    font-weight: 700;
    border: 3px solid #fb340b;
    padding: 1rem;
    border-radius: 2rem;
    margin: 1rem 0;
  }

  @media (max-width: 1182px) {
    .form-login-container {
      width: 70%;
    }
  }

  @media (max-width: 844px) {
    .form-container {
      width: auto;
    }

    .form-login-container {
      width: auto;
    }
  }

  @media (max-width: 587px) {
    .form-container {
      display:  inherit;
    }

    .form-inputs {
      display: flex;
      flex-direction: column;
      width: 90%;
      margin: auto;
    }
  }
</style>