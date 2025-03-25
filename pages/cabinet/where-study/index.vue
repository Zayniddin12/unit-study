<template>
  <div>
    <UIWrapperPage :title="$t('where_study')" has-edit>
      <client-only>
        <h3 class="text-dark font-bold text-2xl leading-130 pb-4">
          1 заявление
        </h3>
        <div class="grid grid-cols-2 gap-5">
          <UIWrapperInfo
            v-for="(item, index) in whereStudy(cabinetList)"
            :key="index"
            v-bind="item"
          />
        </div>
      </client-only>
    </UIWrapperPage>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { whereStudy } from '~/data/profile'
import { cabinetStore } from '~/store/cabinet'

const loading = ref(true)
const { fetchCabinet } = cabinetStore()
const cabinetList = computed(() => cabinetStore().cabinetList)

// Promise.allSettled([fetchCabinet()])
//     .then(results => {
//       const [result] = results;
//       if (result.status === 'rejected') {
//         console.error('Ошибка при получении кабинета:', result.reason);
//       }
//       loading.value = false;
//     });
//

const store = cabinetStore()
onMounted(() => {
  store.step = 3
})

definePageMeta({
  middleware: 'auth',
})
</script>
