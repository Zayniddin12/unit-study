<template>
  <div
    class="relative w-full h-full flex flex-col justify-between p-6"
    :class="{ '!pl-0': index === 0 }"
  >
    <div class="w-full h-[2px] bg-gray-100 opacity-[0.2] mx-auto" />
    <div :class="{ '!ml-6': index === 0 }" class="flex items-center mt-6 mb-12">
      <UIButton
        variant="bg-white"
        :text="card?.name"
        main-class="text-nowrap"
        class="!rounded-full hover:bg-white hover:!text-dark cursor-auto active:!scale-100"
      />
    </div>
    <div :class="{ '!ml-6': index === 0 }" class="flex flex-col">
      <client-only>
        <count-up
          v-if="isVisible"
          ref="counter"
          class="md:text-6xl text-4xl font-bold text-dark mb-2"
          :start-val="0"
          :end-val="countVal"
          :duration="5"
          :options="{
            suffix: countSuffix,
          }"
          decimal-separator=""
          :decimal-places="0"
          :delay="8000"
        />
      </client-only>
      <p class="text-sm text-dark">
        {{ card?.description }}
      </p>
    </div>
    <div
      :class="{ hidden: index === 0 }"
      class="h-[80%] w-[2px] bg-gray-100 opacity-[0.2] absolute top-12 left-0 bottom-0"
    />
  </div>
</template>

<script lang="ts" setup>
import CountUp from 'vue-countup-v3'

interface Props {
  card?: {
    title: string
    description: string
    service?: string
  }
  index: number
  activeLink: string
  isVisible?: boolean
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (event: 'active', link: string): void
}>()

const countVal = ref(0)
const countSuffix = ref('')

function endVal() {
  if (props.card?.number > 999 && props.card?.number < 1000000) {
    countVal.value = props.card?.number / 1000
    countSuffix.value = 'K'
  } else if (props.card?.number > 999999 && props.card?.number < 1000000000) {
    countVal.value = props.card?.number / 1000000
    countSuffix.value = 'M'
  } else if (
    props.card?.number > 999999999 &&
    props.card?.number < 1000000000000
  ) {
    countVal.value = props.card?.number / 1000000000
    countSuffix.value = 'B'
  } else {
    countVal.value = props.card?.number
    countSuffix.value = ''
  }
}

const active = (link: string) => {
  emits('active', link)
}

onMounted(() => {
  endVal()
})
</script>

<style scoped>
.router-link-exact-active p {
  @apply bg-blue-600 text-white;
}

.router-link-exact-active .make-me {
  @apply bg-blue-600 text-white;
}

.router-link-exact-active .make-me:hover i {
  @apply bg-blue-600 text-white;
}

.router-link-exact-active .make-me:hover .numbers {
  @apply bg-blue-600 text-white;
}
</style>
