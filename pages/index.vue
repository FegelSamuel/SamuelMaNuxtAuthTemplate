<script setup lang="ts">

const { status, data : session } = useAuth(); // destructuring data 

/*
useAuth() returns something like this
{
  status: Ref<'authenticated' | 'unauthenticated' | 'loading'>,
  data: Ref<Session | null>,
  signIn: Function,
  signOut: Function
}

*/
const loggedIn = (session.value?.user?.email == undefined) ? false : true // either you are logged in or you are not logged in

</script>

<template lang="pug">
button.px-5.py-2.rounded-2xl.bg-gradient-to-br.from-emerald-500.to-lime-400.text-white.font-semibold.shadow-lg.hover(v-if="loggedIn") Sign Out
button.px-5.py-2.rounded-2xl.bg-gradient-to-br.from-red-500.to-fuschia-400.text-white.font-semibold.shadow-lg.hover(v-else) Sign Up
</template>