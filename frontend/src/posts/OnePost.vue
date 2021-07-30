<template>
  <Header />
  <div>
    <button @click="back()" class="back">Retour</button>

    <div class="message-container">
      <div>
        <h2>Contenu du message</h2>
        <p>{{ message.content }}</p>
      </div>
      <div v-if="typeOfImg !== null && !isUrl">
        <h2>Image</h2>
        <img class="message__img" :src="message.img" alt="">
      </div>
      <br />
    </div>
    <button class="add-comm" @click="addComment()">Ajouter un commentaire</button>
    <div v-show="commActive" class="add-comm__container">
      <form>
        <div class="add-comm__content">
          <p>Contenu</p>
          <textarea type="text" v-model="commentContent" />
          </div>
      </form>
      <button @click="sendComment()">Envoyer le commentaire</button>
    </div>
    <div class="comments-container">
      <div class="comm__container" v-for="(comment, index) in comments" :key="index">
        <div class="comment__header">
          <p class="comment__infos">{{ comment.User.firstname }} {{ comment.User.name }}, le
            {{message.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + message.createdAt.slice(11,16)}}</p>
            <div>
              <button v-if="(locID == comment.userId && index !== indexComm) || (isAdmin == 'true'  &&  index !== indexComm)" @click="modify(index)">
                Modifier
              </button>
              <button v-if="modif && indexComm === index" @click="addModif(index)">
                Appliquer
              </button>
              <button v-if="modif && indexComm === index" @click="cancel()">Annuler</button>
              <button v-if="locID == comment.userId || isAdmin == 'true'" @click="deleteComm(index)">
                Supprimer
              </button>
            </div>
        </div>
        <div class="comment__content">
          <p v-if="indexComm !== index">{{ comment.content }}</p>
          <label v-if="modif && indexComm === index" for="content">Contenu du commentaire</label>
          <textarea class="input-content" name="content" v-if="modif && indexComm === index" v-model="comment.content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../headers/Header";
export default {
  name: "OnePost",
  components: {
    Header,
  },
  data() {
    return {
      message: [],
      comments: [],
      modif: false,
      locID: "",
      isAdmin: false,
      commActive: false,
      commentContent: "",
      commentImg: "",
      indexComm: "",
      typeOfImg: "",
      isUrl: false,
    };
  },
  methods: {
    modify: function (index) {
      this.modif = true;
      this.indexComm = index
    },
    cancel: function () {
      this.modif = false;
      this.indexComm = "";
    },
    back: function () {
      this.$router.push("/allPosts");
    },
    addModif: function (index) {

      var commentSelected = this.comments[index];

      if (confirm("Voulez-vous vraiment effectuer ces modifications ?")) {
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        );
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          userId: +localStorage.getItem("id"),
          messageId: this.message.id,
          img: commentSelected.img,
          content: commentSelected.content,
        });

        var requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        var url = "http://localhost:3000/api/comment/" + commentSelected.id;

        fetch(url, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            this.modif = false;
          })
          .catch((error) => console.log("error", error));
      }
    },
    deleteComm: function (index) {
      var commentSelected = this.comments[index];

      if (confirm("Voulez-vous vraiment supprimé ce commentaire ?")) {
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + localStorage.getItem("token")
        );

        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow",
        };

        var url = "http://localhost:3000/api/comment/" + commentSelected.id;

        fetch(url, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(result)
            location.reload()
          })
          .catch((error) => console.log("error", error));
      }
    },
    addComment: function () {
      this.commActive = !this.commActive;
    },
    sendComment: function () {
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        userId: +localStorage.getItem("id"),
        messageId: this.message.id,
        content: this.commentContent,
        img: this.commentImg,
      });
      console.log(raw);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3000/api/comment/", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          location.reload();
        })
        .catch((error) => console.log("error", error));
    },
    getOnePost: function () {

      this.locID = localStorage.getItem("id")
      const postId = this.$route.params.id;
      this.isAdmin = localStorage.getItem("admin");

      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://localhost:3000/api/message/" + postId, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          this.message = JSON.parse(result);
          this.typeOfImg = typeof (this.message.img);
          this.isUrl = this.message.img.startsWith("http")
          this.seeComments(this.message.id);
        })
        .catch((error) => console.log("error", error));
    },
    seeComments: function (id) {
      this.seeComm = true;
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      var url = "http://localhost:3000/api/comment/message/" + id;

      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          var dataComm = JSON.parse(result);
          this.comments = dataComm.data;
        })
        .catch((error) => console.log("error", error));
    },
  },
  mounted() {
    this.getOnePost();
  },
};
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

  .message-container {
    width: 50%;
    margin: 2rem auto 1rem;
    border: 2px solid black;
    border-radius: 2rem;
    padding: 2rem;
  }
  .message__img {
    max-width: 50%;
  }

  .add-comm {
    padding: 1rem;
    cursor: pointer;
    font-weight: 500;
    border-radius: .5rem;
  }

  .add-comm:hover {
    color: white;
    background-color: green;
    border: 2px solid green;
  }

  .add-comm__container {
    width: 50%;
    margin: 2rem auto;
    border: 1px solid;
    padding: 1rem;
  }

  .add-comm__content {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1.5rem;
  }

  .add-comm__content textarea {
    height: 40px;
    max-width: 85%;
    width: 85%;
  }

  .comments-container {
    margin-top: 4rem;
  }

  .comment__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .comment__header button {
    margin-right: 1rem;
  }

  .comm__container {
    width: 50%;
    margin: auto;
    margin-bottom: 1rem;
    background-color: #a9a9a961;
    padding: 0 0 1rem .5rem;
  }

  .comment__infos {
    font-size: smaller;
    font-style: italic;
  }

  .comment__content {
    text-align: left;
  }

  .comment__content textarea {
    vertical-align: middle;
    margin: 0 0 1rem 2rem;
    width: 302px;
    height: 94px;
    max-width: 600px;
  }

  @media (max-width: 1060px) {
    .add-comm__content {
      display: inline-block;
    }
  }

  @media (max-width: 718px) {
    .comm__container {
      width: 100%;
    }
  }

  @media (max-width: 548px) {
    .add-comm__container {
      width: 100%;
    }

    .comment__content {
      text-align: left;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>