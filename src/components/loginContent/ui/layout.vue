<script lang="ts" setup>
  import LocaleSwitch from "@/ui/localeSwitch";
  import { useI18n } from "vue-i18n";
  const i18n = useI18n()
  interface IProps {
    title: string,
    prompt?: string
  }

  defineProps<IProps>()
</script>
<template>

  <div class="login__layout">
    <div class="login__layout-logo">
      {{ $t('logo.text') }}
    </div>
    <h1 class="login__layout-title">
      {{ title }}
    </h1>
    <div class="login__layout-prompt">
        {{ prompt }}
    </div>
    <slot />

    <div class="login__layout-footer">
      <LocaleSwitch
        :value="i18n.locale.value"
        @change="(e) => { i18n.locale.value = e }"
      />

      <div class="login__layout-links">
        <a href="#">
          {{$t('login.layout.conditions')}}
        </a>

        <a href="#">
          {{$t('login.layout.confidentiality')}}
        </a>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../styles/layout.scss";
</style>
