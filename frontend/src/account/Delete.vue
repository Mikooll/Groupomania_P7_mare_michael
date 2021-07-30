<template>
  <div>
    <div v-if="loader" class="loader__container">
      <div class="fulfilling-bouncing-circle-spinner">
        <div v-if="deleted" class="circle"></div>
        <div v-if="deleted" class="orbit"></div>
      </div>
    </div>
    <button class="delete-btn" @click.prevent="deleteAccount()">Supprimer mon compte</button>
  </div>
</template>

<script>
  import axios from "axios";
  import router from '../router';

  export default {
    data() {
      return {
        loader: false,
      }
    },
    methods: {
      deleteAccount: function () {
        if (confirm("Voulez-vous vraiment supprimé définitivement votre compte ?")) {
          this.loader = true;
          axios.delete("http://localhost:3000/api/users/profile/" + localStorage.getItem('id'), {
              headers: {
                "Authorization": +localStorage.getItem("token")
              }
            })
            .then(() => {
              setTimeout(() => {
                this.loader = false
                alert("Le compte a bien été supprimé")
                localStorage.clear();
                router.push('/');
              }, 2000)
            })
            .catch(error => {
              this.loader = false;
              console.log(error);
            })
        }
      },
    },
  };
</script>

<style>
  .delete-btn {
    padding: 1rem;
    font-size: 1.5rem;
    margin-top: 5rem;
    font-weight: 700;
  }

  .delete-btn:hover {
    color: white;
    background-color: red;
    border: 2px solid red;
  }
</style>