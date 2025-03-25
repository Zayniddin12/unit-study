<template>
  <div
    class="sm:flex-y-center flex-col shrink-0 sm:w-[560px] max-sm:w-full gap-3"
  >
    <div
      class="flex sm:flex-row-reverse flex-col-reverse rounded-20 overflow-hidden bg-white w-full"
    >
      <div class="w-full p-5">
        <div class="w-full mb-3">
          <span class="h-5 w-[75%] rounded-lg shimmer" />
          <span class="h-5 w-[100%] rounded-lg shimmer" />
        </div>
        <div class="w-full space-y-0">
          <span class="h-3 w-[75%] rounded-lg shimmer" />
          <span class="h-3 w-[100%] rounded-lg shimmer" />
        </div>
        <div class="flex items-center gap-2.5 w-full mt-8">
          <span class="w-4 h-4 shimmer" />
          <p class="shimmer w-1/2 rounded-lg h-2 block" />
        </div>
        <div class="flex items-center gap-2.5 max-sm:flex-col mt-3">
          <div
            class="border border-dark/[0.10] p-3 rounded-[10px] flex gap-2 w-full items-center"
          >
            <span class="shimmer w-full h-10 rounded-lg" />
            <div class="w-full h-10">
              <span class="shimmer w-full h-4 rounded-lg" />
              <span class="shimmer w-full h-4 rounded-lg" />
            </div>
          </div>
          <div
            class="border border-dark/[0.10] p-3 rounded-[10px] flex gap-2 w-full"
          >
            <span
              class="text-dark font-bold text-40 shimmer w-full h-10 rounded-lg"
            />
          </div>
        </div>
      </div>
      <div
        class="max-sm:!w-full sm:max-w-[240px] shrink-0 sm:w-[237px] h-[300px] shimmer"
      />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
