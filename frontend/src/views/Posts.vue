<template>
    <div class="posts">
      <AllPosts/>
    </div>
  </template>
  
  <script>
    import AllPosts from '@/posts/AllPosts';

    export default {
      name: "Posts",
      components: {
        AllPosts
      },
    };
  </script>
  