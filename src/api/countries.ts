import KgzFlag from '@/assets/svg/flags/kgz.svg';
import RusFlag from '@/assets/svg/flags/rus.svg';
import KzFlag from '@/assets/svg/flags/kz.svg';
import BlrFlag from '@/assets/svg/flags/blr.svg';
import ArmFlag from '@/assets/svg/flags/arm.svg';

export interface ICountry {
  title: string,
  code: string,
  icon: string,
  format: string
}

export const list: ICountry[] = [
  {
    title: "Россия(Russia)",
    code: "+7",
    icon: RusFlag,
    format: '### ### ####'
  },
  {
    title: "Кыргызстан(Kyrgyzstan)",
    code: "+996",
    icon: KgzFlag,
    format: '### ## ## ##'
  },
  {
    title: "Казахстан(Kazakhstan)",
    code: "+7",
    icon: KzFlag,
    format: '### ### ####'
  },
  {
    title: "Армения(Armenia)",
    code: "+374",
    icon: ArmFlag,
    format: '## ### #####'
  },
  {
    title: "Белоруссия(Belarus)",
    code: "+375",
    icon: BlrFlag,
    format: '## ### ## ##'
  },
]

export async function  fetchGetCountries (): Promise<ICountry[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(list), 100)
  })
}
