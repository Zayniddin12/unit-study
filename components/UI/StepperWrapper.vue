<template>
  <div>
    <div class="step-shadow w-full rounded-2xl bg-white p-6">
      <Transition mode="out-in" name="dropdown">
        <div :key="currentStep">
          <slot />
        </div>
      </Transition>
    </div>
    <div
      :class="{ '!justify-between': currentStep === 1 }"
      class="step-shadow w-full rounded-2xl bg-white px-4 lg:px-6 py-3 lg:py-4 mt-5 flex flex-col md:flex-row sm:justify-end"
    >
      <UIButton
        :disabled="saveButtonDisabled"
        :loading="saveButtonLoading"
        :text="$t('buttons.save_draft')"
        class="w-full lg:w-auto mr-2 disabled:!text-gray-100"
        variant="secondary"
        @click="handleSave"
      />
      <div
        class="w-full sm:w-auto flex items-center sm:justify-end flex-col sm:flex-row sm:space-x-5 space-y-2 sm:space-y-0"
      >
        <template v-if="currentStep < 1">
          <Transition mode="out-in" name="fade">
            <UIButton
              v-if="currentStep !== 0"
              :disabled="secondaryButtonDisabled"
              class="w-full sm:w-auto"
              text="prev"
              variant="secondary"
              @click="handleStep('prev')"
            />
          </Transition>
          <UIButton
            :disabled="nextButtonDisabled"
            class="w-full md:w-auto max-md:mt-2"
            text="continue"
            @click="handleStep('next')"
          />
        </template>
        <template v-else>
          <UIButton
            v-if="currentStep === 1"
            class="mb-2 md:mb-0 max-sm:w-full max-sm:mt-4"
            text="prev"
            variant="outline"
            @click="handleStep('prev')"
          />
          <UIButton
            :disabled="submitButtonDisabled"
            :loading="submitButtonLoading"
            class="w-full lg:w-auto"
            text="continue"
            @click="handleSumbitProfile"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string
  currentStep?: number
  nextButtonDisabled?: boolean
  saveButtonDisabled?: boolean
  secondaryButtonDisabled?: boolean
  submitButtonDisabled?: boolean
  submitButtonLoading?: boolean
  saveButtonLoading?: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'handleStep', value: string): void
  (e: 'saveProfile'): void
  (e: 'submitProfile'): void
}>()

const handleStep = (value: string) => {
  emit('handleStep', value)
}

const handleSave = () => {
  emit('saveProfile')
}

const handleSumbitProfile = () => {
  emit('submitProfile')
}
</script>

<style scoped>
.step-shadow {
  box-shadow: 0 4px 28px 0 rgba(24, 24, 24, 0.03);
}
</style>
