<script lang="ts" setup>
  import {computed, Ref, ref, toRefs} from "vue";

  import BaseSelect from "@/ui/baseSelect";
  import BaseButton from "@/ui/baseButton";
  import BaseErrorMessage from "@/ui/baseErrorMessage";
  import Layout from './layout.vue'

  import { phoneFormRules } from '../utils/constants.ts'
  import { vMaska } from "maska/vue";

  import { useCountriesStore } from "@/store/countries.ts";
  import { useAuthStore } from "@/store/auth.ts";

  const { authCreate } = useAuthStore()
  const { getCountryCodeFormat } = useCountriesStore()
  const { selectOptionCountriesList } = toRefs(useCountriesStore())
  const { errors,  isLoading } = toRefs(useAuthStore())

  const countryPhoneCode: Ref<string> = ref('')
  const phoneNumber:Ref<string> = ref('')
  const formRefs: Ref = ref('')

  const mask = computed(() => {
    return `${countryPhoneCode.value} ${getCountryCodeFormat(countryPhoneCode.value)}`
  })

  async function onSend () {
    const { valid } = await formRefs.value.validate()

    if (valid) {
      const validPhone: string = phoneNumber.value.replace('+', '').split(' ').join('')
      await authCreate(validPhone)
    }
  }

</script>
<template>
  <Layout
      :title="$t('login.phone.title')"
      :prompt="$t('login.phone.description')"
  >
    <div class="login__phone">
      <BaseErrorMessage
        :errors="errors"
      />
      <v-form
          @submit.prevent="onSend"
          ref="formRefs"
      >
        <BaseSelect
            v-model:value="countryPhoneCode"
            :label="$t('login.phone.select')"
            :items="selectOptionCountriesList"
            @change="() => phoneNumber = ''"
        />
        <v-text-field
            v-model="phoneNumber"
            v-maska="mask"
            :label="$t('login.phone.input')"
            variant="outlined"
            :rules="[phoneFormRules.phone(mask)]"
            :readonly="!countryPhoneCode"
            required
        />
        <BaseButton
          :loading="isLoading"
        >
          {{ $t('login.phone.button') }}
        </BaseButton>
      </v-form>
    </div>
  </Layout>
</template>
<style lang="scss">
  @import "../styles/phone.scss";
</style>
