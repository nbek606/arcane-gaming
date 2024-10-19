<script lang="ts" setup>
  import {localesList} from "@/locales/utils.ts";

  interface IProps {
    value?: string
  }

  const { value = 'ru' } = defineProps<IProps>()

  const emit = defineEmits<{
    (e: 'update:value', value: string): void
    (e: 'change', value: string): void
  }>()

  function onChange (value: string) {
    emit('update:value', value)
    emit('change', value)
  }
</script>
<template>
  <v-select
    class="locale__switch"
    :items="localesList"
    :model-value="value"
    item-value="locale"
    item-title="title"
    variant="underlined"
    density="compact"
    @update:modelValue="onChange"
  />
</template>
<style lang="scss">
  @import "../styles/style.scss";
</style>
