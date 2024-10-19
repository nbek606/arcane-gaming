<script lang="ts" setup>
  import BaseButton from "@/ui/baseButton";
  import { useAuthStore } from "@/store/auth.ts";
  import {toRefs} from "vue";

  const { selectedChannel, currentStep } = toRefs(useAuthStore())
  const { changeStep } = useAuthStore()

  function onBack () {
    changeStep(currentStep.value - 1)
  }
</script>
<template>
  <div
      class="login__registration"
      v-if="selectedChannel"
  >
    <span
        class="login__registration-back"
        @click="onBack"
    >
      <v-icon icon="mdi-arrow-left"></v-icon>
    </span>
    <div class="login__registration-img">
      <img :src="selectedChannel.image_url"/>
    </div>

    <h2 class="login__registration-title">
      {{ selectedChannel.name }}
    </h2>

    <p class="login__registration-description">
      {{ selectedChannel.description }}
    </p>

    <BaseButton
      :to="selectedChannel.link"
    >
      <a
          :href="selectedChannel.link"
          target="_blank"
      >
        {{$t('login.registration.button')}}
      </a>
    </BaseButton>
  </div>
</template>
<style lang="scss">
  @import '../styles/registration.scss';
</style>
