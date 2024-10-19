<script lang="ts" setup>
  import {computed, ref} from "vue";

  interface ISelectItem {
    title: string,
    value: string,
    icon?: string
  }

  interface IProps {
    items: ISelectItem[] | [],
    searchable?: boolean,
    label:string,
    showValue?: boolean,
    value?: string
  }

  const {
    searchable = false,
    showValue = false,
    items,
    value
  } = defineProps<IProps>()

  const emit = defineEmits<{
    (e: 'update:value', value: string): void
    (e: 'update:title', value: string): void
    (e: 'change'): void
  }>()

  const searchItemText = ref('');
  const toggleDropdown = ref(false)

  const sortItems = computed(() => {
    return items.filter(item => item.title.includes(searchItemText.value))
  })

  const onChange = (value: ISelectItem) => {
    emit('update:value', value.value)
    emit('update:title', value.title)
    emit('change')
    toggleDropdown.value = false
    searchItemText.value = ''
  }

  const onTextFieldClick = () => {
    toggleDropdown.value = !toggleDropdown.value
  }

  const titleByValue = computed(() => {
    return items.find(item => item.value === value)
  })

</script>
<template>
  <div class="base__select">
    <v-text-field
        :model-value="titleByValue?.title"
        class="base__select-input"
        @click="onTextFieldClick"
        variant="outlined"
        append-inner-icon="mdi-chevron-down"
        :label="label"
        readonly
    />

    <div
        class="base__select-dropdown"
        v-if="toggleDropdown"
    >
      <div
        class="base__select-search"
        v-if="searchable"
      >
        <v-text-field
            placeholder="Поиск"
            density="compact"
            prepend-inner-icon="mdi-magnify"
            v-model="searchItemText"
            clearable
        />
      </div>
      <div
          class="base__select-list"
          v-if="sortItems.length"
      >
        <div
            class="base__select-item"
            v-for="item in sortItems"
            @click="onChange(item)"
        >
          <img
            v-if="item.icon"
            class="base__select-icon"
            :src="item.icon"
          />
          <span>
            {{ item.title }}
          </span>
          <span
            v-if="showValue"
            class="base__select-value"
          >
            {{ item.value }}
          </span>
        </div>
      </div>
      <div
        v-else
        class="base__select-item text-center"
      >
        Ничего не найдено
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import "../styles/style.scss";
</style>
