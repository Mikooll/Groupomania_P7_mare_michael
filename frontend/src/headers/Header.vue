<template>
  <div class="header">
    <div v-if="loader" class="loader__container">
      <div class="fulfilling-bouncing-circle-spinner">
        <div class="circle"></div>
        <div class="orbit"></div>
      </div>
    </div>

    <div class="img-container">
      <img src="../images/logos/groupomania.png" alt="Groupomania logo" class="image-logo-home" />
    </div>

    <div class="nav-container">
      <nav class="navigation">
        <router-link to="/posts" class="link-route">
          <div>Accueil</div>
        </router-link>
        <router-link to="/account" class="link-route">
          <div>Mon compte</div>
        </router-link>
        <a @click="disconnect()" href="" class="link-route">Deconnexion</a>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        loader: false
      }
    },
    methods: {
      disconnect: function () {
        this.loader = true;

        setTimeout(() => {
          this.loader = false;
          localStorage.clear();
        }, 2000)

        setTimeout(function(){
          this.$router.push('/')
        }, 5000)
      }
    },
  };
</script>

<style>
  .link-route {
    color: white;
    font-size: 1.5rem;
    text-decoration: none;
    font-weight: 600;
  }

  .img-container {
    height: 7rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f3583578;
    margin-bottom: 3rem;
  }

  .image-logo-home {
    width: 7rem;
  }

  .nav-container {
    width: 50%;
  }

  .navigation {
    display: flex;
    justify-content: space-around;
  }

  @media (max-width: 883px) {
    .navigation {
      display: inline-block;
    }

    .nav-container {
      width: 100%;
    }

  }
</style>