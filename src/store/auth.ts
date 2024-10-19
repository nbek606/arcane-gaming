import {defineStore} from "pinia";
import {ref, computed, Ref} from "vue";
import {fetchAuthCreate,fetchCodeCheck, fetchCodeSend} from "@/api/auth.ts";
import {differencesBetweenDate, parseTime} from "@/helpers/dateTime.ts";
import type {IChannel} from "@/models/IChannel.ts";
import {isAxiosError} from "axios";

export const useAuthStore = defineStore('auth', () => {
  const sessionId: Ref<string> = ref('')
  const sessionExpired: Ref<number> = ref(0)
  const codeTimer: Ref<number> = ref(0)
  const channelsList: Ref<IChannel[]> = ref([])
  const currentStep: Ref<number> = ref(0)
  const sendPhoneNumber: Ref<string> = ref('')
  const selectedChannel: Ref<IChannel | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)
  const errors: Ref<string[]> = ref([])

  function changeStep (value: number) {
    currentStep.value = value
  }
  async function authCreate (phone: string) {
    isLoading.value = true
    errors.value = []
    try {
      const { data } = await fetchAuthCreate(phone)
      isLoading.value = false
      sessionId.value = data.session_id
      sessionExpired.value = differencesBetweenDate(data.session_expired_at)
      channelsList.value = data.channels
      sendPhoneNumber.value = phone
      changeStep(currentStep.value + 1)
      startTimerSessionExpired()
    } catch(error) {
      isLoading.value = false
      setErrors(error)
    }
  }

  async function codeSend (type: string) {
    errors.value = []

    try {
      await fetchCodeSend({ type, session_id: sessionId.value })
      codeTimer.value = 60
      startCodeTimer()
    } catch (error) {
      setErrors(error)
    }
  }

  async function codeCheck (code: string) {
    isLoading.value = true
    errors.value = []
    try {
      const { data } = await fetchCodeCheck({ code: code, session_id: sessionId.value})
      isLoading.value = false
      console.log(data)
    } catch (error) {
      isLoading.value = false
      setErrors(error)
    }
  }

  function setErrors (error: any) {
    if (isAxiosError(error)) {
      const { message, response } = error
      const errorMessage = response ? response.data.error : message
      errors.value = typeof errorMessage === 'object' ? errorMessage : [errorMessage]
    }
  }
  function startTimerSessionExpired () {
    const interval = setInterval(() => {
      if (sessionExpired.value === 1) {
        clearInterval(interval)
        errors.value = []
        changeStep(0)
      }
      sessionExpired.value -= 1
    }, 1000)
  }

  function startCodeTimer () {
    const interval = setInterval(() => {
      if (codeTimer.value === 1) clearInterval(interval)
      codeTimer.value -= 1
    }, 1000)
  }

  const codeTimerByTimeFormat = computed(() => {
    return parseTime(codeTimer.value)
  })

  function setSelectedChannel (type: IChannel) {
    selectedChannel.value = type
  }

  const getOptionsChannelList = computed(() => {
    return channelsList.value?.map(item => ({
      title: item.name,
      value: item.type,
      icon: item.image_url
    }))
  })


  return {
    authCreate,
    changeStep,
    codeSend,
    codeCheck,
    setSelectedChannel,
    sessionId,
    channelsList,
    getOptionsChannelList,
    currentStep,
    sendPhoneNumber,
    codeTimerByTimeFormat,
    codeTimer,
    selectedChannel,
    errors,
    isLoading
  }
})
