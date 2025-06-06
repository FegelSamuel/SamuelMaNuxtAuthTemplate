<template>
  <form
    @submit.prevent="submitSignupForm"
    class="w-full max-w-xl mx-auto flex flex-col items-center justify-center bg-white p-6 sm:p-10 rounded-2xl"
  >
    <h2
      class="text-2xl sm:text-3xl font-extrabold text-center text-[#022150] mb-8"
    >
      Hello and Welcome!
    </h2>
      <!-- Email -->
      <div>
        <label class="block text-md font-semibold text-gray-800 mb-2"
          >Email</label
        >
        <input
          type="email"
          v-model="signupModel.email"
          class="w-full px-4 py-3 text-md rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#89BBEB] transition"
        />
      </div>

    <!-- Already have account -->
    <div class="text-md mt-6 text-center text-gray-600">
      <strong>
        Already have an account?
        <a href="./login" class="text-[#D97ED5] hover:underline transition">
          Sign In
        </a>
      </strong>
    </div>

    <!-- Register Button -->
    <button
      type="submit"
      class="mt-8 w-full sm:w-[300px] py-4 px-6 text-xl text-white font-semibold bg-[#D97ED5] hover:bg-purple-500 transition rounded-2xl"
    >
      Register
    </button>
  </form>
</template>

<script setup lang="ts">
const router = useRouter();
const errors = ref({});

const signupModel = ref({
  email: "",
  role: "USER",
});

const submitSignupForm = async () => {
  errors.value = {};
  try {
    const { data, error, status } = await useFetch("/api/user", {
      method: "POST",
      body: signupModel.value,
      watch: false
    });
    console.log(status.value)
    if (status.value as string === "success") { // only accept status code 200
      router.push("login");
    } else {
      errors.value = { error: "Signup failed." };
    }
  } catch (err) {
    console.error("Error submitting signup form", err);
    errors.value = { error: "Something went wrong during signup." };
  }
  console.log(errors.value)
};
</script>