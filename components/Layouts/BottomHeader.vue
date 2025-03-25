<script lang="ts" setup>
import { headerMenu } from '~/data'
import { useMenuStore } from '~/store/menu'

const menuStore = useMenuStore()

const menuCategoriesData = ref([])

const menuCategories = computed(() => menuStore.menuCategory)
const activeCategories = ref([])

const showChildren = ref(true)
</script>

<template>
  <nav class="w-fit mx-auto shadow-header">
    <ul
      class="hidden items-center lg:flex justify-between transition-300 relative gap-3 ml-4"
    >
      <li v-for="item in headerMenu" :key="item.id" class="inline-block mr-1">
        <NuxtLink
          :to="'/' + item?.slug"
          class="inline-block text-base text-dark font-medium leading-20 transition-colors transition-500 ease-in-out transition-300 duration-400 hover:text-primary group relative cursor-pointer"
          >{{ $t(`${item?.title}`) }}
        </NuxtLink>
      </li>
    </ul>

    <TransitionGroup name="fade">
      <div
        v-show="showChildren && activeCategories.length !== 0"
        class="hidden md:block pt-[128px] max-h-[350px] overflow-hidden bg-white pb-5 transition-all transition-300 w-full absolute top-0 left-0 z-1"
      >
        <div class="container">
          <!--        category lists  -->
          <ul class="grid grid-cols-3 pb-5">
            <li
              v-for="(
                { id, title, slug, isStatic, url }, idx
              ) in activeCategories.slice(0, 15)"
              :key="id"
              class="cols-span-1 group h-[45px] pl-4 pr-2.5 hover:bg-[#F7F9FA] transition-300 hover:rounded-md cursor-pointer last:!ml-0 space-x-4"
            >
              <NuxtLink
                :class="{
                  'border-b-0': idx === menuCategories.length - 1,
                }"
                :to="isStatic ? `/pages/${slug}` : url"
                class="w-full block py-3 text-dark text-lg font-medium leading-20 transition-colors duration-300 group border-b border-b-[#E1ECFA]"
                >{{ title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </TransitionGroup>
  </nav>
</template>
