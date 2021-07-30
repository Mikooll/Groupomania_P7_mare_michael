<template>
    <div>
        <Header/>
        <MyPosts/>
        <Delete/>
    </div>
</template>

<script>
    import Header from '../headers/Header.vue';
    import MyPosts from '../account/MyPosts.vue';
    import Delete from '../account/Delete.vue';

    export default {
        name: "Account",
        components: {
          Header,
          MyPosts,
          Delete
        },
      };
</script>