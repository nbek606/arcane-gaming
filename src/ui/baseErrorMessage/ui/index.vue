<script lang="ts" setup>
  interface IProps {
    errors: string[]
  }
  defineProps<IProps>()
</script>
<template>
  <div class="error__message">
    <v-alert
        :text="item"
        type="error"
        v-for="item in errors"
    />
  </div>
</template>
<style lang="scss">
  @import "../styles/style.scss";
</style>
