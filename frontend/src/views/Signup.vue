<template>
  <div class="signup">
    <ConnectionHeader />
    <router-link to="/login" class="connect">Se connecter</router-link>
    <SignupForm />
  </div>
</template>

<script>
  // @ is an alias to /src
  import SignupForm from '@/forms/SignupForm.vue';
  import ConnectionHeader from '@/headers/ConnectionHeader'

  export default {
    name: 'Signup',
    components: {
      SignupForm,
      ConnectionHeader
    },
  }
</script>