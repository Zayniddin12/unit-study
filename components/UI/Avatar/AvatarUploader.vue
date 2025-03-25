<template>
  <div>
    <div
        class="avatar-upload relative h-20 w-20 group !cursor-pointer overflow-hidden "
    >
      <input
          ref="fileInput"
          class="absolute top-0 right-0 left-0 bottom-0 z-20 opacity-0 cursor-pointer"
          type="file"
          accept=".jpg, .jpeg, .png"
          @change="previewImage"
      />

      <div class="avatar-upload__blur absolute-center w-full h-full"></div>

      <div class="relative">
        <UIAvatar
            :key="image"
            v-bind="{ image }"
            class="absolute inset-0 w-full h-full cursor-pointer !border-0 "
            image-class="!rounded-[12px]"
        />

        <div
            class="bg-dark-blue/20 absolute inset-0 flex-center opacity-0 group-hover:opacity-100 transition-300 transition-all cursor-pointer"
        >
          <i class="icon-edit text-white text-2xl leading-6"></i>
        </div>
      </div>
    </div>
    <div>
      <button
          v-if="image && !hidden"
          class="text-[#E94720] mt-2 hover:text-red transition-all transition-300 text-xs font-medium leading-5"
          @click="removeImage"
      >
        {{ $t('delete_avatar_image') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

interface Props {
  defaultImage?: string
  hidden: boolean
}

const props = defineProps<Props>()

interface Emits {
  (event: 'update:image', image?: Blob | string): void

  (event: 'remove-image'): void
}

const emit = defineEmits<Emits>()

const image = ref<string | undefined>(props.defaultImage)

const previewImage = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target?.files?.[0]

  const reader = new FileReader()

  reader.onload = (e) => {
    image.value = e?.target?.result as string
  }

  if (file) {
    reader.readAsDataURL(file)
  }
  emit('update:image', file)
}
const removeImage = () => {
  image.value = undefined
  emit('remove-image')
}

watch(
    () => props.defaultImage,
    (newValue) => {
      if (newValue !== image.value) {
        image.value = newValue
      }
    }
)
const fileInput = ref()
</script>
