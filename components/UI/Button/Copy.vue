<template>
  <div class="flex items-center gap-3">
    <div
      class="rounded-full sm:px-4 sm:py-3 p-2 border border-dark-blue/[12%] bg-gray"
    >
      <p
        class="text-base leading-normal text-dark font-medium md:truncate md:max-w-[300px] line-clamp-1 truncate w-full overflow-hidden"
      >
        {{ windowLink }}
      </p>
    </div>
    <button
      class="rounded-full w-10 h-10 p-4 hover:opacity-80 flex-center bg-primary group transition-300 relative"
      @click="copy(windowLink)"
    >
      <i
        class="icon-link text-[22px] text-white group-hover:text-white transition-300"
      />
      <UITooltip v-bind="{ show }" is-top>
        <p>{{ $t('copied') }}</p>
      </UITooltip>
    </button>
  </div>
</template>

<script setup lang="ts">
const show = ref(false)

const windowLink = computed(() => {
  if (process.client) {
    return window.location.href
  }
})

function copy(text: string) {
  if (process.client) {
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.value = text
    input.select()
    input.focus()
    document.execCommand('copy')
    input.remove()
    show.value = true

    setTimeout(() => {
      show.value = false
    }, 1500)
  }
}
</script>
