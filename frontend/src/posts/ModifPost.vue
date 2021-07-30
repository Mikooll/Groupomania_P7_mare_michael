<template>
    <Header />
    <div>
        <div v-if="loader" class="loader__container">
            <div class="fulfilling-bouncing-circle-spinner">
                <div class="circle"></div>
                <div class="orbit"></div>
            </div>
        </div>
        <button @click="back()" class="back">Retour</button>
        <div class="message__modif__container">
            <div class="mess_modif__content">
                <label for="content" class="content__title">Contenu du message</label>
                <p v-if="!modif">{{message.content}}</p>
                <textarea v-if="modif" class="input-content" name="content" v-model="message.content" />
                </div>
            <div>
                <img class="message__img" v-if="typeOfImg !== null && isUrl" :src="message.img" alt="">
                <br>
                <input v-if="modif" class="input-img" ref="myImage" :disabled='!modif' type="file" >
            </div>
        </div>
        <div class="btn__container">
            <button v-if="(authorized && !modif) || (isAdmin == 'true' && !modif)" @click="modify()">Modifier</button>
            <button v-if="modif" @click="addModif()">Appliquer</button>
            <button v-if="modif" @click="cancel()">Annuler</button>
            <button v-if="modif" @click="deletePost()">Supprimer</button>
        </div>
    </div>
</template>

<script>
    import Header from '../headers/Header';

    export default {
        components: {
            Header
        },
        data() {
            return {
                message: [],
                authorized: false,
                modif: false,
                isAdmin: false,
                typeOfImg: "",
                isUrl: false,
                loader: false
            }
        },
        methods: {
            back: function() {
                this.$router.push("/allPosts")
            },
            modify: function () {
                this.modif = true
            },
            cancel: function () {
                this.modif = false
            },
            addModif: function () {
                if (confirm("Voulez-vous vraiment effectuer ces modifications ?")) {
                    this.loader = true;
                    var formData = new FormData()

                    var myHeaders = new Headers();
                    myHeaders.append("Authorization",
                        "Bearer " + localStorage.getItem("token")
                        );
                    formData.append("userId", +localStorage.getItem("id"));
                    formData.append("content", this.message.content);
            
                    if(this.$refs.myImage.files.length > 0) {
                        formData.append("img", this.$refs.myImage.files[0])
                    }

                    var requestOptions = {
                        method: 'PUT',
                        headers: myHeaders,
                        body: formData,
                        redirect: 'follow'
                    };

                    var url = "http://localhost:3000/api/message/" + this.message.id;

                    fetch(url, requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            console.log(result)
                            setTimeout(() => {
                                this.loader = false;
                                this.$router.push('/allPosts');
                                alert("Le message à été modifié");
                            }, 2000)
                        })
                        .catch(error => {
                            console.log('error', error);
                            this.loader = false
                        });
                }
            },
            deletePost: function () {
                if (confirm("Voulez-vous vraiment supprimé ce message ?")) {
                    this.loader = true;
                    var myHeaders = new Headers();
                    myHeaders.append("Authorization",
                        "Bearer " + localStorage.getItem("token")
                    );

                    var requestOptions = {
                        method: 'DELETE',
                        headers: myHeaders,
                        redirect: 'follow'
                    };
                    var url = "http://localhost:3000/api/message/" + this.message.id;


                    fetch(url, requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            console.log(result)
                            setTimeout(() => {
                                this.loader = false;
                                this.$router.push('/allPosts');
                                alert("Le message à été supprimé")
                            }, 2000)
                        })
                        .catch(error => {
                            this.loader = false;
                            console.log('error', error)
                        });
                }
            },
            getOnePost: function () {
                const postId = this.$route.params.id;
                this.isAdmin = localStorage.getItem("admin");

                var myHeaders = new Headers();
                myHeaders.append("Authorization",
                    "Bearer " + localStorage.getItem('token')
                );

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch("http://localhost:3000/api/message/" + postId, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        this.message = JSON.parse(result);
                        this.typeOfImg = typeof (this.message.img);
                        this.isUrl = this.message.img.startsWith("http")
                        if (localStorage.id == this.message.userId) {
                            this.authorized = true;
                        } else {
                            this.authorized = false;
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        },
        props: [
            'id'
        ],
        mounted() {
            this.getOnePost();
        },

    }
</script>

<style>
    .message__modif__container {
        border: 1px solid;
        border-radius: 1rem;
        width: 42%;
        margin: auto;
        padding: 1rem;
    }

    .mess_modif__content {
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
    }

    .mess_modif__content textarea {
        height: 6rem;
    }

    .content__title {
        font-weight: 600;
    }

    .btn__container button {
        padding: 1rem;
        margin: 1rem;
    }

    .back {
        margin-bottom: 2rem;
    }

    @media (min-width: 678px) {
        .btn__container button {
            margin-right: 1rem;
        }
    }

    @media (max-width: 964px) {
        .message__modif__container {
            width: auto;

        }

        .mess_modif__content {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .mess_modif__content textarea {
            height: 82px;
            max-width: 80%;
        }
    }

    @media (max-width: 677px) {
        .btn__container {
            display: flex;
            justify-content: space-around;
        }
    }

    @media (max-width: 412px) {
        .btn__container {
            flex-direction: column;
            width: 50%;
            margin: auto;
        }
    }
</style>