<template>
  <Transition mode="out-in" name="fade">
    <div :key="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <template v-if="loading">
        <CardUniversity v-for="key in 6" :key="key" loading />
      </template>
      <template v-if="!loading && universities.length">
        <CardUniversity
          v-for="(card, i) in universities"
          :key="i"
          v-bind="{ card }"
        />
      </template>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import type { IUniversity } from '~/types/common'

interface Props {
  universities: IUniversity[]
  loading?: boolean
}

defineProps<Props>()
</script>
