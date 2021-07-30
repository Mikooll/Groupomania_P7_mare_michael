<template>
    <div>
        <h2>Bonjour, {{ username }} <span v-if="isAdmin == true">(Super Admin)</span></h2>
        <h3>Vous avez posté {{ dataLength }} <span v-if="dataLength > 1"> messages</span><span v-if="dataLength <= 1">
                message</span></h3>
        <div v-if="dataLength >= 1" class="messages-container">
            <ul v-for="post in posts" :key="post.id">
                <li><a class="message__link" :href="'#/modifPost/' + post.id">Message du
                        {{ post.createdAt.slice(0,10).split('-').reverse().join('/') }}</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataLength: "",
                posts: [],
                username: "",
                isAdmin: false,
            }
        },
        methods: {
            getPosts: function () {
                console.log(localStorage)
                this.isAdmin = localStorage.getItem("admin")
                var myHeaders = new Headers();
                myHeaders.append("Authorization",
                    "Bearer " + localStorage.getItem("token")
                );

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                var url = "http://localhost:3000/api/message/user/" + localStorage.getItem("id")
                console.log(url)

                fetch(url, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        var datas = JSON.parse(result).data;
                        this.posts = datas;
                        this.dataLength = datas.length
                        console.log(this.posts)
                        this.username = localStorage.getItem("firstname")
                        console.log(this.username)
                    })
                    .catch(error => console.log('error', error));
            }
        },
        mounted() {
            this.getPosts();
        },
    }
</script>

<style>
    .messages-container {
        width: 30%;
        margin: auto;
    }

    .messages-container ul {
        padding: 0;

    }

    .messages-container li {
        list-style: none;
        border: 2px solid #ff000042;
        padding: .5rem;
        margin-bottom: 1rem;
        cursor: pointer;
    }

    .messages-container li:hover {
        background-color: #ff000042;
        color: black;
    }

    .messages-container a {
        padding: .5rem 5.8rem;
    }

    .message__link {
        text-decoration: none;
    }

    @media (max-width: 1288px) {
        .messages-container {
            width: 55%;
        }
    }

    @media (max-width: 768px) {
        .messages-container {
            width: 100%;
        }
    }

    @media (max-width: 396px) {
        .messages-container a{
            padding: 0;
        }
    }
</style>