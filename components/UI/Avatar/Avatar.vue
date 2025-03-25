<template>
  <div
    class="relative rounded-lg !overflow-hidden shrink-0 bg-gray"
    :class="[
      { 'w-[100px] h-[100px]': size === 'lg' },
      { 'w-[72px] h-[72px]': size === 'md' },
      { 'w-[52px] h-[52px]': size === 'sm' },
      { 'w-10 h-10': size === 'xsl' },
      { 'w-8 h-8': size === 'xs' },
      avatarClass,
      {
        'before:rounded-lg before:absolute before:inset-0 before:border-2 before:border-[rgba(105, 117, 131, 0.16)]':
          !noBorder,
      },
    ]"
  >
    <UIShimmer v-bind="{ loading }" width="100%" height="100%">
      <img
        v-if="!isError && !!image"
        loading="lazy"
        :src="image"
        :class="imageClass"
        alt="avatar-image"
        class="w-full h-full object-cover rounded-lg"
        @error="isError = true"
      />
      <img
        v-else
        loading="lazy"
        :src="defaultImage"
        :class="imageClass"
        alt="avatar-default-image"
        class="w-full h-full object-cover rounded-lg"
      />
    </UIShimmer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  image?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xsl'
  avatarClass?: string
  imageClass?: string
  loading?: boolean
  defaultImage?: string
  noBorder?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  avatarClass: '',
  imageClass: '',
  defaultImage: '/images/profile/DefaultImage.svg',
})

const isError = ref(false)
</script>
