import i18n from "@/i18n.ts";

const t = i18n.global.t

export const phoneFormRules = {
  phone: (format: string) => (value:string) => {
    if (!value) {
      return t('rules.empty', {name: t('login.phone.input')})
    }

    if (format.length !== value.length) {
      return t('rules.format', {name: t('login.phone.input')})
    }

    return true;
  }
}
