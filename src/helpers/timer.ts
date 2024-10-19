import {Ref } from 'vue'
export function startSetInterval (callback: Function, value: Ref<number>, ms: number) {
  const interval = setInterval(() => {
    if (value.value === 1) {
      clearInterval(interval)
      return callback
    }

    value.value -= 1
  }, ms)
}
