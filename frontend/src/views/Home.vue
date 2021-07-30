<template>
  <div class="home">
    <ConnectionHeader />
    <div class="btn-connect__container">
      <router-link to="/signup" class="connect connect-button">S'inscrire</router-link>
      <router-link to="/login" class="connect connect-button">Se connecter</router-link>
    </div>
    <div class="welcome__container">
      <p>Bienvenue sur le réseau social interne de Groupomania</p>
      <p>Cet outil à pour but de faciliter les intéractions entre collegues</p>
      <p>N'hésitez pas à vous connecter <router-link to="/signup" class="connection">ici</router-link> si vous avez déjà un compte</p>
      <p>Ou bien créer un compte en quelques clics <router-link to="/login" class="connection">ici</router-link>, et utilisez l'outil directement</p>
    </div>
  </div>
</template>

<script>
  import ConnectionHeader from '../headers/ConnectionHeader'
  export default {
    name: "Home",
    components: {
      ConnectionHeader
    },
  };
</script>

<style>
  .welcome__container {
    margin: 4rem 0;
  }

  .connect-button {
    margin-right: 2rem !important;
  }

  .connection {
    color: red;
    text-decoration: none;
  }

  @media (max-width: 375px) {
    .btn-connect__container {
      display: flex;
      justify-content: space-around;
    }

    .connect {
      margin: 0 !important;
    }
  }
</style>
