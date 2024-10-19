import {defineStore} from "pinia";
import { fetchGetCountries } from "@/api/countries.ts";
import type {ICountry} from '@/api/countries.ts';

import {computed, ref, Ref} from "vue";

export const useCountriesStore = defineStore('countries', () => {
  const countriesList: Ref<ICountry[]> = ref([])

  async function getCountries () {
    try {
      const data:Awaited<ICountry[]> = await fetchGetCountries()
      countriesList.value = data
    } catch (error) {}
  }

  function getCountryCodeFormat (code: string) {
    return countriesList.value.find(item => item.code === code)?.format
  }

  const selectOptionCountriesList = computed(() => {
    return countriesList.value.map(item => ({ title: item.title, value: item.code, icon: item.icon }))
  })

  return {
    getCountries,
    getCountryCodeFormat,
    selectOptionCountriesList,
    countriesList,
  }
})
