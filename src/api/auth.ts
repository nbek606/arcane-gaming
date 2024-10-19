import { $api } from "@/plugins/api.ts";

interface IAuthParams {
  type: string,
  session_id: string,
  code: string
}

export async function fetchAuthCreate (phone: string) {
  return await $api.post(`/v2/create`, { send: false, to: phone })
}

export async function fetchCodeSend(type: Omit<IAuthParams, 'code'>) {
  return await $api.post(`/v2/send`, type)
}

export async function fetchCodeCheck(type: Omit<IAuthParams, 'type'>) {
  return await $api.post(`/v2/check`, type)
}
