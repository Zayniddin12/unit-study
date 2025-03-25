<template>
  <div class="sm:py-[72px] pt-10 pb-6">
    <div
      class="container flex items-center lg:gap-20 md:gap-10 gap-6 max-[800px]:flex-col-reverse relative"
    >
      <div
        class="bg-white/[0.02] max-[800px]:hidden rounded-xl border border-white/[0.20] backdrop-blur-[10px] w-full h-full absolute z-0 top-0 left-0"
      />
      <CardMainContactLinks
        class="relative !z-10 md:max-w-[445px] w-full"
        data-aos="fade-right"
        data-aos-duration="2000"
      />
      <CardMainContactQuestions
        class="relative !z-10 min-[800px]:!-my-8 lg:mr-6 mr-0"
        data-aos="fade-left"
        data-aos-duration="2000"
      />
      <div class="min-[800px]:hidden text-start w-full mb-4">
        <h3
          class="text-white text-left font-normal leading-130 sm:text-32 text-2xl mb-2"
        >
          {{ $t('contact_us_title') }}
        </h3>
        <p class="text-white/60 sm:text-base text-sm font-normal leading-130">
          {{ $t('contact_us_subtitle') }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
