<template>
  <Header />
  <div>
    <div v-if="loader" class="loader__container">
      <div class="fulfilling-bouncing-circle-spinner">
          <div class="circle"></div>
          <div class="orbit"></div>
      </div>
  </div>
    <router-link to="/AllPosts" class="back">Retour</router-link>
    <h2 class="new-post__title">Creation d'un nouveau post</h2>
    <div class="message__container">
      <div >
        <h3>Contenu</h3>
        <textarea class="content-input" v-model="content" />
        <h3>Image</h3>
        <input ref="myImage" class="img-input" type="file" />
      </div>
      <button class="publish" @click="publish()">PUBLIER</button>
    </div>
  </div>
</template>

<script>
  import Header from '../headers/Header';

  export default {
    components: {
      Header,
    },
    data() {
      return {
        content: "",
        loader: false
      };
    },
    methods: {
      publish: function () {
        this.loader = true;
        var formData =  new FormData()
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization",
          "Bearer " + localStorage.getItem("token")
        );
        
        formData.append("userId", +localStorage.getItem("id"));
        formData.append("content", this.content,);

        if(this.$refs.myImage.files.length > 0) {
          formData.append("img", this.$refs.myImage.files[0])
        }

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formData,
          redirect: 'follow'
        };

        fetch("http://localhost:3000/api/message/", requestOptions)
          .then(response => response.text())
          .then(() => {
            this.loader = false;
            this.$router.push("/allPosts");
          })
          .catch(error => {
            this.loader = false;
            console.log(error)
          });
      }, 
    }, 
  }
</script>

<style>
  .back {
    background: #80808040;
    padding: 1rem 4rem;
    font-weight: 700;
    border: 1px solid;
    text-decoration: none;
    color: black;
    cursor: pointer;
  }

  .new-post__title {
    margin: 3rem 0;
  }

  .message__container {
    border: 1px solid;
    border-radius: 1rem;
    width: 30%;
    margin: auto;
  }

  .content-input {
    width: 90%;
    max-width: 90%;
    height: 6rem;
  }

  .img-input {
    margin-bottom: 2rem;
  }

  .publish {
    padding: 1rem;
    cursor: pointer;
    font-weight: 500;
    border-radius: .5rem;
    margin-bottom: 1rem;
    width: 65%;
  }

  .publish:hover {
    color: white;
    background-color: green;
    border: 2px solid green;
  }
</style>