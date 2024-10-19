<script lang="ts" setup>
  interface IProps {
    loading?: boolean,
    disabled?: boolean
  }
  defineProps<IProps>()

</script>
<template>
  <v-btn
    class="base__button text-none"
    height="55"
    color="#007AFF"
    text="none"
    type="submit"
    :loading="loading"
    :disabled="disabled"
  >
    <slot/>
  </v-btn>
</template>
<style lang="scss">
  @import "../styles/style.scss";
</style>
