<template>
  <div class="wrapper">

    <div v-if="loader" class="loader__container">
      <div class="fulfilling-bouncing-circle-spinner">
        <div class="circle"></div>
        <div class="orbit"></div>
      </div>
    </div>

    <h2>Connexion</h2>
    <p v-if="isWrong" class="isWrong">{{ errors }}</p>

    <form @submit.prevent="loginDatas">
      <div class="form-login-container">
        <label v-show="email != '' " for="login-email">Email :</label>
        <input class="login-input" id="login-email" type="text" placeholder="Email" v-model="email" />
        <p v-show="submitted && !email" class="error">
          Oups, vous avez oublié d'indiquer votre adresse mail
        </p>
        <label v-show="password != '' " for="login-password">Mot de passe :</label>
        <input class="login-input" id="login-password" type="password" placeholder="Mot de passe" v-model="password" />
        <p v-show="submitted && !password" class="error">Veuillez insérer votre mot de passe</p>
      </div>
      <button id="login-btn" class="login-btn">Connexion</button>
    </form>
  </div>
</template>

<script>
  import axios from "axios";
  import router from "../router";

  export default {
    data() {
      return {
        email: "",
        password: "",
        submitted: false,
        errors: "",
        loader: "",
        isWrong: false
      };
    },
    methods: {
      loginDatas: function () {
        this.loader = true;
        let email = this.email;
        let password = this.password;
        this.submitted = true;

        axios
          .post("http://localhost:3000/api/users/login", {
            email,
            password
          })
          .then((response) => {
            var admin;

            response.data.isAdmin == "0" ? admin = false : admin = true;

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("admin", admin);
            localStorage.setItem("id", response.data.userId);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("firstname", response.data.firstname);

            setTimeout(() => {
              this.loader = false;
              router.push("/allPosts");
            }, 2000);
          })
          .catch((error) => {
            this.loader = false;
            this.isWrong = true;
            let errorCode = error.message.split("code ")[1];
            switch (errorCode) {
              case "401":
                this.errors = "Mot de passe incorrect";
                break;
              case "403":
                this.errors = "Le compte à été supprimé";
                break;
              case "404":
                this.errors = "Utilisateur non trouvé";
                break;
            }
          });
      },
    },
  };
</script>

<style>
  .wrapper {
    margin-top: 3rem;
  }

  .form-login-container {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: 2rem auto;
    border: 2px solid black;
    padding: 1rem;
    border-radius: 1rem;
  }

  .login-input {
    height: 2rem;
    width: 50%;
    margin: .5rem auto 2rem;
  }

  .login-btn {
    background-color: black;
    color: white;
    font-size: larger;
    width: auto;
    padding: .5rem;
    border: none;
    border-radius: 1rem;
  }
  .isWrong {
    color: red;
    font-size: 1.5rem;
    font-weight: 600;
  }
</style>