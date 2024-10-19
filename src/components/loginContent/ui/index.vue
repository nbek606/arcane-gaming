<script lang="ts" setup>
  import Code from './code.vue';
  import Phone from './phone.vue'
  import Registration from "./registration.vue";

  import {onMounted, toRefs} from "vue";
  import { useCountriesStore } from '@/store/countries.ts'
  import { useAuthStore } from "@/store/auth.ts";

  const { getCountries } = useCountriesStore()
  const { currentStep } = toRefs(useAuthStore())

  const steps = [Phone, Code, Registration]

  async function sendGetCountries () {
    await getCountries()
  }

  onMounted(() => {
    sendGetCountries()
  })
</script>
<template>
  <div class="login">
    <component :is="steps[currentStep]" />
  </div>
</template>
<style lang="scss">
  @import "../styles/style.scss";
</style>
