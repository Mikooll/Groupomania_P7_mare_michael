<template>
    <div>
        <div>
            <router-link to="/"><img class="image-logo" src="../images/logos/groupomania.png" alt="Groupomania logo" /></router-link>
            <h1>Bienvenue sur Groupomania</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ConnectionHeader",
    };
</script>

<style>
    .image-logo {
        width: 13rem;
    }
</style>