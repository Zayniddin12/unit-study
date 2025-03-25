<script lang="ts" setup>
import type { IBanner } from '~/types/common'
import { formatRichText } from '~/utils'

interface Props {
  banner: IBanner
}

defineProps<Props>()

const viewportHeight = ref(window.innerHeight)

// Update viewportHeight on window resize
const updateViewportHeight = () => {
  viewportHeight.value = window.innerHeight
}

// Add and remove event listeners for resize
onMounted(() => {
  window.addEventListener('resize', updateViewportHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateViewportHeight)
})
</script>

<template>
  <main
    ref="scroll"
    class="bottom-0 md:!w-screen md:!h-screen !h-full !w-full top-0 relative"
  >
    <div
      class="absolute z-5 md:w-screen md:h-screen h-full w-full top-0 left-0"
      style="
        background: radial-gradient(
          321.91% 102.42% at 99.03% 16.69%,
          rgba(13, 14, 41, 0.09) 19.43%,
          rgba(13, 14, 41, 0.9) 100%
        );
      "
    />
    <div class="relative z-10 w-full h-full inset-0 top-0">
      <div
        class="animate-fadeAndMove relative md:relative flex flex-col w-full h-full container"
        :class="
          viewportHeight < 705
            ? 'md:top-[140px] top-10'
            : 'md:top-[228px] top-10'
        "
      >
        <p
          class="md:text-xl text-base leading-normal text-white font-normal max-w-[445px] mb-3"
          v-html="formatRichText(banner?.description)"
        />
        <p
          class="relative inline leading-112 font-bold md:text-52 text-2xl text-white max-w-[780px] mb-12"
        >
          {{ banner?.title }}
        </p>
        <!--            <p-->
        <!--              class="max-h-[56px] inline-flex items-center justify-center text-2.5xl md:text-[48px] font-mts font-bold px-4 text-white text-center bg-blue"-->
        <!--            >-->
        <!--              {{ banner?.colored_word }}-->
        <!--            </p>-->
        <div class="max-sm:flex-col md:flex hidden gap-3 relative z-50">
          <UIButton
            text="contact_us_btn"
            variant="outline-primary"
            class="!test-white"
            @click="navigateTo('/contact')"
          />
          <a href="#numbers_about">
            <UIButton
              class="max-sm:w-full"
              text="be_friend_with"
              variant="primary"
            />
          </a>
        </div>
      </div>
    </div>
    <div class="bg-image absolute w-full h-full z-1">
      <img :alt="banner.title" :src="banner.image_url" />
    </div>
  </main>
</template>

<style scoped>
.title-after:after {
  content: '';
  position: absolute;
  top: -0.25em;
  right: 100%;
  bottom: -0.25em;
  width: 0.25em;
}
.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.bg-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes fadeAndMove {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeAndMove {
  animation: fadeAndMove 0.5s ease; /* Adjust the duration and timing function as needed */
}
</style>
