<template>
  <Transition name="fade-fast" mode="out-in">
    <img
        :key="imageSrc"
        width="24"
        height="24"
        :src="imageSrc"
        :alt="type"
        @error.prevent="handleImageError"
    />
  </Transition>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";

interface Props {
  type: string | undefined;
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {});

// keep track added files to /images/svg/payments
const availableCardImages = ["humo", "mastercard", "mir", "uzcard", "visa"];

const getImageSrc = (type: string | undefined) => {
  if (type && availableCardImages.includes(type.toLowerCase())) {
    return `/images/svg/payments/${type?.toLocaleLowerCase()}.svg`;
  } else {
    return "/images/svg/payments/card.svg";
  }
};

const imageSrc = ref(getImageSrc(props.tpye));

function handleImageError() {
  imageSrc.value = "/images/svg/payments/card.svg";
}

watch(
    () => props.type,
    (newType) => {
      imageSrc.value = getImageSrc(newType);
    },
    { immediate: true }
);
</script>
