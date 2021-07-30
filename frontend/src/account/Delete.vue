<template>
  <div>
    <button class="delete-btn" @click.prevent="deleteAccount()">Supprimer mon compte</button>
  </div>
</template>

<script>
  import axios from "axios";
  import router from '../router';

  export default {
    methods: {
      deleteAccount: function () {
        if (confirm("Voulez-vous vraiment supprimé définitivement votre compte ?")) {
          axios.delete("http://localhost:3000/api/users/profile/" + localStorage.getItem('id'), {
              headers: {
                "Authorization": +localStorage.getItem("token")
              }
            })
            .then(() => {
              localStorage.clear();
              router.push('/');
            })
            .catch(error => {
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