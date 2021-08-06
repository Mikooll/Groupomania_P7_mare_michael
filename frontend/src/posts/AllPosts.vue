<template>
    <Header />
    <div class="posts">
        <NoPosts v-if="noPost" />
        <button class="new-post__button" @click="newPost()">Nouveau message</button>
        <div v-for="message in messages" :key="message.id" class="card bg-light my-3">
            <div class="card__header">
                <div>
                    <span class="card__infos">
                        Posté par {{message.User.firstname}} {{ message.User.name }},
                        le
                        {{message.createdAt.slice(0,10).split('-').reverse().join('/') + ' à ' + message.createdAt.slice(11,16)}}
                    </span>
                </div>
                <div class="card__modif" v-if="message.userId == this.currentUserId || isAdmin == 'true' ">
                    <a class="edit__link" :href="'#/modifPost/' + message.id">Éditer le message</a>
                </div>
            </div>
            <div>
                <p>{{message.content}}</p>
            </div>
            <div class="card__comment">
                <a :href="'#/commentaires/' + message.id" class="">Accéder au message</a>
            </div>
        </div>
        <div class="card__footer">
            <p class="end__messages">Il n'y a plus aucun message en dessous...</p>
        </div>
    </div>
</template>

<script>
    import NoPosts from './NoPost';
    import Header from '../headers/Header';

    export default {
        name: 'AllPosts',
        components: {
            NoPosts,
            Header
        },
        data() {
            return {
                noPost: false,
                messages: [],
                currentUserId: "",
                isAdmin: false,
            }
        },
        methods: {
            newPost: function () {
                this.$router.push('/newPost')
            },
            openPost: function (id) {
                this.$router.push('/post/' + id)
            }
        },
        created: function () {
            this.currentUserId = localStorage.getItem("id");
            this.isAdmin = localStorage.getItem("admin");

            if (localStorage.name != undefined) {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
                myHeaders.append("Content-Type", "application/json");
                console.log(myHeaders)

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch("http://localhost:3000/api/message", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        var datas = JSON.parse(result);
                        this.messages = datas.data
                        if (this.messages.length == 0) {
                            this.noPost = true;
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        }
    }
</script>

<style>
    .new-post__button {
        background: white;
        padding: 1rem;
        width: 20%;
        font-weight: 700;
    }

    .new-post__button:hover {
        color: white;
        background-color: green;
        border: 2px solid green;
    }

    .card {
        background-color: #eab8b8a1;
        width: 35%;
        margin: 2rem auto;
        padding-top: .5rem;
        border-radius: .5rem;
    }

    .card__header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 2rem;
        padding: 0 .3rem 0;
    }

    .card__infos {
        color: #3829ab;
        font-style: italic;
        font-size: smaller;
    }

    .edit__link {
        text-decoration: none;
        border: 1px solid;
        border-radius: 1rem;
        padding: .3rem;
        color: crimson;
        font-size: smaller;
        font-weight: 500;
    }

    .edit__link:hover {
        background-color: crimson;
        color: white;
        border: none;
    }

    .edit__link__icon {
        display: none;
    }

    .card__comment {
        padding: .5rem;
        background-color: #c8c9d0f2;
        border-bottom-left-radius: .5rem;
        border-bottom-right-radius: .5rem;
    }

    .card__comment a {
        text-decoration: none;
        color: black;
        font-weight: 600;
    }

    .end__messages {
        font-size: 3rem;
        font-weight: 700;
        color: red;
    }

    @media (max-width: 1230px) {
        .card {
            width: 70%;
        }
    }
    
    @media (max-width: 654px) {
        .card {
            width: auto;
        }

        .card__header {
            display: inline-block;
        }
        .card__modif {
            margin-top: 1rem;
        }

        .new-post__button {
            width: auto;
        }
    }
</style>