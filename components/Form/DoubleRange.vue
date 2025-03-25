<template>
  <div class="container-range relative left-0">
    <div class="values w-0 h-0 opacity-0">
      <span ref="displayValOne"> 0 </span>
      <span> &dash; </span>
      <span ref="displayValTwo"> 100 </span>
    </div>
    <div
      ref="sliderTrack"
      :class="disabled ? 'opacity-50 slider-track' : 'slider-track'"
    ></div>
    <input
      ref="sliderOne"
      v-model="minValue"
      :max="max"
      :min="min"
      type="range"
      :disabled="disabled"
      @input="slideOne"
    />
    <input
      ref="sliderTwo"
      v-model="maxValue"
      :max="max"
      :min="min"
      type="range"
      :disabled="disabled"
      @input="slideTwo"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  min: number
  max: number
  step: number
  minusValue?: number
  plusValue?: number
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  minusValue: 4,
  plusValue: 3,
})
const minValue = defineModel<number>('minValue')
const maxValue = defineModel<number>('maxValue')
defineEmits(['update:minValue', 'update:maxValue'])

const sliderOne = ref<HTMLInputElement>()
const sliderTwo = ref<HTMLInputElement>()
const displayValOne = ref<HTMLDivElement>()
const displayValTwo = ref<HTMLDivElement>()
const minGap = 0
const sliderTrack = ref<HTMLDivElement>()

function slideOne() {
  if (
    parseInt(sliderTwo.value.value) - parseInt(sliderOne.value.value) <=
    minGap
  ) {
    sliderOne.value.value = parseInt(sliderTwo.value.value) - minGap
  }
  displayValOne.value.textContent = sliderOne.value.value
  fillColor()
}

function slideTwo() {
  if (
    parseInt(sliderTwo.value.value) - parseInt(sliderOne.value.value) <=
    minGap
  ) {
    sliderTwo.value.value = parseInt(sliderOne.value.value) + minGap
  }
  displayValTwo.value.textContent = sliderTwo.value.value
  fillColor()
}

function fillColor() {
  const percent1 = (sliderOne.value.value / sliderOne.value.max) * 100
  const percent2 = (sliderTwo.value.value / sliderOne.value.max) * 100
  sliderTrack.value.style.setProperty(
    'background',
    `linear-gradient(to right,
      #F2F3F7 ${percent1}% ,
      #F24E91 ${percent1}%,
      #F24E91 ${percent2}%,
      #F2F3F7 ${percent2}%)`,
    'important'
  )
}

watch(
  maxValue,
  () => {
    sliderTwo.value.value = maxValue.value
    fillColor()
  },
  { deep: true }
)
watch(
  minValue,
  () => {
    sliderOne.value.value = minValue.value
    fillColor()
  },
  { deep: true }
)
onMounted(() => {
  if (process.client) {
    fillColor()
  }
})
</script>

<style scoped>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  height: 100vh;
  display: -ms-grid;
  display: grid;
  background-color: #0266fb;
  place-items: center;
}

.wrapper {
  position: relative;
  width: 80%;
  background-color: #ffffff;
  padding: 50px 40px 20px 40px;
  border-radius: 10px;
}

input[type='range']:disabled {
  opacity: 0.95;
  cursor: not-allowed;
}

.slider-track:disabled {
  opacity: 0.1 !important;
}

.container-range {
  position: relative;
  width: 100%;
}

input[type='range'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  outline: none;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
}

.slider-track {
  width: 100%;
  height: 5px;
  position: absolute;
  margin: auto;
  border-radius: 99px;
  top: 3px;
  bottom: 0;
  background: #f2f3f7 !important;
}

input[type='range']::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  height: 5px;
}

input[type='range']::-moz-range-track {
  -moz-appearance: none;
  height: 5px;
}

input[type='range']::-ms-track {
  appearance: none;
  height: 5px;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 28px;
  width: 28px;
  background-color: #fff;
  cursor: pointer;
  margin-top: -9px;
  pointer-events: auto;
  border-radius: 50%;
}

input[type='range']::-moz-range-thumb {
  -webkit-appearance: none;
  height: 28px;
  width: 28px;
  cursor: pointer;
  background-color: #fff;
  pointer-events: auto;
  border: none;
}

input[type='range']::-ms-thumb {
  appearance: none;
  height: 28px;
  width: 28px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #fff;
  pointer-events: auto;
}

input[type='range']::-webkit-slider-thumb {
  background-color: #f24e91;
  border: 3px solid #ffffff;
}

.values {
  background-color: #0266fb;
  width: 32%;
  position: relative;
  margin: auto;
  padding: 10px 0;
  border-radius: 99px;
  text-align: center;
  font-weight: 500;
  font-size: 25px;
  color: #ffffff;
}

.values:before {
  content: '';
  position: absolute;
  height: 0;
  width: 0;
  border-top: 15px solid #0266fb;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  margin: auto;
  bottom: -14px;
  left: 0;
  right: 0;
}

.values:after {
  background-color: #0266fb;
}
</style>
