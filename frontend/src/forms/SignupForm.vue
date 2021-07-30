<template>
  <div class="signup-form">
    <div v-if="loader" class="loader__container">
      <div class="fulfilling-bouncing-circle-spinner">
        <div class="circle"></div>
        <div class="orbit"></div>
      </div>
    </div>
    <h2>Inscription</h2>
    <form @submit.prevent="submitDatas">
      <div class="form-container">
        <div class="form-inputs">
          <label v-show="name != '' " for="name">Nom :</label>
          <input name="name" class="signup-input" id="signup-nom" type="text" placeholder="Nom" v-model="name" />
          <p v-show="submitted && !name">Le nom est requis pour s'inscrire</p>
          <label v-show="firstname != '' " for="firstname">Prenom :</label>
          <input name="name" class="signup-input" id="signup-prenom" type="text" placeholder="Prenom" v-model="firstname" />
          <p v-show="submitted && !firstname">
            Oups, il semble que vous ayez oublié d'inscrire votre prénom dans le
            champ
          </p>
        </div>

        <div class="form-inputs">
          <label v-show="mail != '' " for="signup-email">Email :</label>
          <input class="signup-input" id="signup-email" type="email" placeholder="Email" v-model="mail" />
          <p v-show="submitted && !mail">
            N'oubliez pas d'insérer une adresse mail
          </p>
          <label v-show="password != '' " for="signup-password">Mot de passe :</label>
          <input class="signup-input" id="signup-password" type="password" placeholder="Mot de passe"
            v-model="password" />
          <p v-show="submitted && !password">
            >Aïe, sans mot de passe, impossible de vous inscrire
          </p>
        </div>
      </div>
      <button id="login-btn" class="login-btn">S'inscrire</button>
    </form>
  </div>
</template>

<script>
  import router from '../router';
  import axios from 'axios';
  export default {
    name: "Signup",
    data() {
      return {
        name: "",
        firstname: "",
        mail: "",
        password: "",
        submitted: false,
        loader: false
      };
    },
    methods: {
      submitDatas: function () {
        let name = this.name;
        let firstname = this.firstname;
        let email = this.mail;
        let password = this.password;
        this.submitted = true;

        if (name != "" && firstname != "" && email != "" && password != "") {
          var datas = {
            name,
            firstname,
            email,
            password,
          };
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify(datas);

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch("http://localhost:3000/api/users/signup", requestOptions)
            .then((response) => response.text())
            .then((result) => {
              this.loader = true;
              console.log(result);
              axios
                .post("http://localhost:3000/api/users/login", {
                  email,
                  password
                })
                .then((response) => {
                  console.log(response)
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
            })
            .catch((error) => console.log("error", error));
        }
      },
    },
  };
</script>

<style>
  .signup-form {
    margin-top: 3rem;
  }

  .signup-input {
    height: 2rem;
    width: 100%;
    margin: .5rem auto 2rem;
  }

  .form-container {
    display: flex;
    justify-content: space-around;
    width: 50%;
    margin: 1rem auto;
    border: 2px solid black;
    border-radius: 1rem;
    padding: 2rem 0;
  }

  .form-inputs {
    display: flex;
    flex-direction: column;
    width: 40%;
  }

  .input-form {
    margin-bottom: 3rem;
  }

  /* Loader */

  .loader__container {
    width: 100%;
    height: 100rem;
    z-index: 1;
    position: fixed;
    padding-top: 22rem;
    top: 0;
    background-color: #bac5efbd;
  }

  .fulfilling-bouncing-circle-spinner, .fulfilling-bouncing-circle-spinner * {
    box-sizing: border-box;
  }

  .fulfilling-bouncing-circle-spinner {
    margin: auto;
    height: 60px;
    width: 60px;
    position: relative;
    animation: fulfilling-bouncing-circle-spinner-animation infinite 4000ms ease;
  }

  .fulfilling-bouncing-circle-spinner .orbit {
    height: 60px;
    width: 60px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    border: calc(60px * 0.03) solid #ff1d5e;
    animation: fulfilling-bouncing-circle-spinner-orbit-animation infinite 4000ms ease;
  }

  .fulfilling-bouncing-circle-spinner .circle {
    height: 60px;
    width: 60px;
    color: #ff1d5e;
    display: block;
    border-radius: 50%;
    position: relative;
    border: calc(60px * 0.1) solid #ff1d5e;
    animation: fulfilling-bouncing-circle-spinner-circle-animation infinite 4000ms ease;
    transform: rotate(0deg) scale(1);
  }

  @keyframes fulfilling-bouncing-circle-spinner-animation {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes fulfilling-bouncing-circle-spinner-orbit-animation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1);
    }
    62.5% {
      transform: scale(0.8);
    }
    75% {
      transform: scale(1);
    }
    87.5% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes fulfilling-bouncing-circle-spinner-circle-animation {
    0% {
      transform: scale(1);
      border-color: transparent;
      border-top-color: inherit;
    }
    16.7% {
      border-color: transparent;
      border-top-color: initial;
      border-right-color: initial;
    }
    33.4% {
      border-color: transparent;
      border-top-color: inherit;
      border-right-color: inherit;
      border-bottom-color: inherit;
    }
    50% {
      border-color: inherit;
      transform: scale(1);
    }
    62.5% {
      border-color: inherit;
      transform: scale(1.4);
    }
    75% {
      border-color: inherit;
      transform: scale(1);
      opacity: 1;
    }
    87.5% {
      border-color: inherit;
      transform: scale(1.4);
    }
    100% {
      border-color: transparent;
      border-top-color: inherit;
      transform: scale(1);
    }
  }
</style>