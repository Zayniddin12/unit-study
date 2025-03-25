<template>
  <div class="flex items-center gap-3">
    <p class="text-base leading-normal text-dark font-medium">
      {{ $t('print') }}
    </p>
    <button
      class="rounded-lg w-10 h-10 bg-[#D9E8FC] flex-center hover:bg-primary group transition-300"
      @click="print"
    >
      <i
        class="icon-printer text-[22px] text-primary group-hover:text-white transition-300"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
function print() {
  if (process.client) {
    window.print()
  }
}
</script>
