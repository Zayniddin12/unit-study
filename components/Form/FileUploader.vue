<template>
  <div class="flex flex-col gap-3 items-start">
    <div
      class="w-full"
      @dragover.prevent="handleDragOver"
      @drop.prevent="handleDrop"
      @dragenter.prevent="handleDragEnter"
      @dragleave.prevent="handleDragLeave"
    >
      <input
        :id="id"
        :key="id"
        :accept="
          acceptTypes ??
          '.pdf, .doc, .docx, .rtf, .xls, .xlsx, .ppt, .pptx, .txt, .csv, .zip, .rar, .webp, .png, .jpg, .jpeg'
        "
        :name="id"
        class="w-0 h-0 absolute"
        type="file"
        @change="handleFile"
      />
      <div
        :class="[{ '!border-red': error }]"
        class="w-full flex items-center space-between flex-col rounded-lg transition-300 pl-3 pr-1.5 py-1 border border-dashed border-gray-100/10 bg-gray"
        @click="getFile('create')"
      >
        <slot>
          <div class="text-base flex-center-between w-full">
            <p class="text-sm leading-130 font-normal text-gray-100">
              {{ t('add_file_here') }}
            </p>
            <UIButton
              :text="t(Boolean(files.length) ? 'add' : 'choose_file')"
              class="!py-1.5"
              size="sm"
              :loading="uploadLoading"
              variant="outline"
            />
          </div>
        </slot>
      </div>

      <div
        v-if="files.length"
        :key="files.length"
        class="flex flex-col gap-3 mt-2"
      >
        <div
          v-for="(item, index) in files"
          :key="index"
          class="flex-center-between relative rounded-xl border border-secondary p-2 transition-300"
        >
          <div class="flex-y-center gap-2">
            <div class="w-8 h-8 flex-center rounded-lg bg-primary/20 shrink-0">
              <i class="icon-file-text text-primary text-2xl" />
            </div>
            <div>
              <p
                class="text-xs leading-130 text-black font-medium truncate max-w-40 lg:max-w-md"
              >
                {{ item?.filename || item?.file_url }}
              </p>

              <p
                v-if="item?.filesize"
                class="text-10 leading-130 font-normal text-dark"
              >
                {{ convertBytes(item?.filesize) }}
              </p>
            </div>
          </div>
          <i
            class="icon-close text-xl text-gray-500 hover:text-red transition-300 cursor-pointer"
            @click="removeImage(index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { url } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import type { TFile } from '~/types/application'
import { convertBytes } from '~/utils'

const emit = defineEmits(['update:modelValue'])

interface Props {
  modelValue?: string[]
  error?: boolean
  defaultImages?: TFile[]
  id?: string
  acceptTypes?: string
  url?: string
}

const props = defineProps<Props>()

const { t } = useI18n()

const files = reactive<TFile[]>([])
const uploadType = ref('')
const currentTarget = ref(null)
const uploadLoading = ref(false)
const { showToast } = useCustomToast()

onMounted(() => {
  if (props.defaultImages) {
    props.defaultImages.forEach((item) => {
      files.push(item)
    })
  }
  updateModelValue()
})

const handleFile = async (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (!target?.files) return

  for (const file of Array.from(target.files)) {
    await handleUploader(file)
  }
  updateModelValue()
}

const handleUploader = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
    reader.onerror = (error) => reject(error)
  })
    .then((base64) => {
      uploadLoading.value = true
      if (file.size > 10485760) {
        showToast(t('big_file'), 'error')
        uploadLoading.value = false
      } else {
        useApi()
          .$post(`/development/${props.url}/advanced_create`, {
            body: {
              vals: {
                file: (base64 as string).split(',')[1],
              },
            },
          })
          .then((result) => {
            files.push({
              id: crypto.randomUUID().toString(),
              file_id: result[0].id,
              file_url: base64 as string,
              filename: file.name,
              filesize: file.size,
            })
            updateModelValue()
          })
          .catch((error) => {
            showToast(error, 'error')
          })
          .finally(() => {
            uploadLoading.value = false
          })
      }
    })
    .catch(() => {
      // Todo: Toast show for error
    })
}

const getFile = (type: string) => {
  if (process.client) {
    uploadType.value = type
    const input = document.getElementById(props.id)
    input?.click()
  }
}

const removeImage = (index: number) => {
  files.splice(index, 1)
  updateModelValue()
}

const updateModelValue = () => {
  emit('update:modelValue', files)
}

const dragging = ref(false)

const handleDragOver = (event: Event) => {
  event.preventDefault()
}

const handleDragEnter = (e) => {
  dragging.value = true
  currentTarget.value = e.target
}

const handleDragLeave = (e) => {
  if (e.target === currentTarget.value) {
    currentTarget.value = null
    dragging.value = false
  }
}

const handleDrop = async (event: DragEvent) => {
  event.preventDefault()
  dragging.value = false
  uploadType.value = 'create'
  if (event.dataTransfer?.files) {
    for (const file of Array.from(event.dataTransfer.files)) {
      await handleUploader(file)
    }
    updateModelValue()
  }
}
</script>
