<script setup lang="ts">

const { status, data : session, signOut } = useAuth(); // destructuring the variable data that was returned from useAuth and renaming to to session
// the reason why we want to rename data is because "session" is more descriptive.

/*
useAuth() returns something like this
{
  status: Ref<'authenticated' | 'unauthenticated' | 'loading'>,
  data: Ref<Session | null>,
  signIn: Function,
  signOut: Function
}

*/



</script>

<template lang="pug">
button(v-if="status != 'unauthenticated' && status != undefined" @click="() => signOut({ callbackUrl: '/login'})") Sign Out
button(v-else)
  NuxtLink(to="/signup") Sign Up
</template>