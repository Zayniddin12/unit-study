<template>
  <div class="bg-gray py-7 md:py-16">
    <section v-if="faqs.length" class="container">
      <h1
        class="md:mb-12 mb-3 heading-1 max-md:text-xl md:text-[48px] leading-112"
      >
        {{ $t('faq') }}
      </h1>
      <div class="grid gap-5 grid-cols-1 md:grid-cols-12">
        <SectionsFaq
          class="w-full col-span-1 md:col-span-8"
          :faq="faqs"
          answer-class="max-md:text-sm"
        />
        <div
          class="pt-[91px] col-span-1 md:col-span-4 lg:min-w-96 pb-7 px-8 bg-white/[0.64] border border-white rounded-[20px] h-fit flex justify-center flex-col"
        >
          <img
            loading="lazy"
            src="/images/svg/faq-dec.svg"
            alt="decoration"
            class="max-w-[236px] mx-auto"
          />
          <p
            class="text-dark-blue mt-[57px] md:text-2xl text-xl font-bold leading-130 text-center"
          >
            {{ $t('have_question') }}
          </p>
          <p
            class="text-dark-blue mt-3 md:text-sm text-xs font-normal leading-130 text-center"
          >
            {{ $t('have_question_subtitle') }}
          </p>
          <UIButton
            variant="primary"
            class="w-full mt-8"
            :text="$t('contact_us_btn')"
            @click="navigateTo('/contact')"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const faqs = ref<any>([])

async function getFaqs() {
  await useApi()
    .$get('/development/params/faq/advanced_list/', {
      params: {
        specification: { question: {}, answer: {} },
      },
    })
    .then((res) => {
      faqs.value = res.records
    })
    .catch((err) => {
      return new Error(err)
    })
}

getFaqs()
</script>
