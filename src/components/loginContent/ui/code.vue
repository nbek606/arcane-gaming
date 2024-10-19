<script lang="ts" setup>
  import BaseSelect from "@/ui/baseSelect";
  import BaseButton from "@/ui/baseButton";
  import Layout from "./layout.vue";

  import {computed, ref, toRefs} from "vue";
  import { useAuthStore } from "@/store/auth.ts";
  import BaseErrorMessage from "@/ui/baseErrorMessage";

  const { codeSend, codeCheck, setSelectedChannel, changeStep } = useAuthStore()
  const { currentStep } = toRefs(useAuthStore())

  const {
    channelsList,
    codeTimerByTimeFormat,
    getOptionsChannelList,
    codeTimer,
    sendPhoneNumber,
    errors,
    isLoading
  } = toRefs(useAuthStore());

  const form = ref({ type: '', code: ''})

  const getSelectedChannel = computed(() => {
    return channelsList.value.find(item => item.type === form.value.type)
  })

  function onSend () {
    if (!getSelectedChannel.value) return

    if (!getSelectedChannel.value.is_active) {
      setSelectedChannel(getSelectedChannel.value)
      changeStep(currentStep.value + 1)
      return
    }

    codeSend(form.value.type)
  }

  function onCheck () {
    codeCheck(form.value.code)
  }

  function onPrev () {
    changeStep(currentStep.value - 1)
  }
</script>
<template>
  <Layout
    :title="$t('login.code.title')"
    :prompt="$t('login.code.description', { phoneNumber: sendPhoneNumber })"
  >
    <div class="login__code">
      <v-form
        @submit.prevent="onCheck"
      >
        <BaseErrorMessage
            :errors="errors"
        />
        <BaseSelect
          v-model:value="form.type"
          :label="$t('login.code.select')"
          :items="getOptionsChannelList"
        />
        <v-text-field
          v-model="form.code"
          :label="$t('login.code.input')"
          variant="outlined"
          :readonly="!form.type"
        >
          <template #append-inner>
            <span
                v-if="!!codeTimer"
                class="login__code-timer"
            >
              {{codeTimerByTimeFormat}}
            </span>
            <span
                v-else
                class="login__code-send"
                @click="onSend"
            >
              {{$t('login.code.inputButton')}}
            </span>
          </template>
          </v-text-field>
          <div
              class="login__code-buttons"
          >
            <button
              class="login__code-buttons__prev"
              @click="onPrev"
            >
              <v-icon icon="mdi-arrow-left"></v-icon>
              <strong>
                {{ $t('login.code.prev') }}
              </strong>
            </button>
            <BaseButton
                :loading="isLoading"
                :disabled="!form.code"
            >
              {{ $t('login.code.button') }}
            </BaseButton>
          </div>
        </v-form>
    </div>
  </Layout>
</template>
<style lang="scss">
  @import '../styles/code.scss';
</style>
