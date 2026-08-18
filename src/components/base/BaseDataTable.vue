<script setup>
import BasePagination from "./BasePagination.vue";
import BaseSearch from "./BaseSearch.vue";

const props = defineProps({
  headers: {
    type: Array,
    default: () => [],
  },

  items: {
    type: Array,
    default: () => [],
  },

  searchable: {
    type: Boolean,
    default: true,
  },

  pagination: {
    type: Boolean,
    default: true,
  },

  currentPage: {
    type: Number,
    default: 1,
  },

  totalPages: {
    type: Number,
    default: 1,
  },
});

const search = defineModel("search");
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">

    <div
      v-if="searchable"
      class="border-b border-slate-200 p-6"
    >
      <BaseSearch v-model="search" />
    </div>

    <div class="overflow-x-auto">

      <table class="w-full">

        <thead class="bg-slate-50">

          <tr>

            <th
              v-for="header in headers"
              :key="header.key"
              class="p-5 text-right font-semibold"
            >
              {{ header.label }}
            </th>

            <th
              v-if="$slots.actions"
              class="text-center"
            >
              الإجراءات
            </th>

          </tr>

        </thead>

        <tbody>

          <tr
            v-for="item in items"
            :key="item.id"
            class="border-t border-slate-100 hover:bg-slate-50"
          >

            <td
              v-for="header in headers"
              :key="header.key"
              class="p-5"
            >
              {{ item[header.key] }}
            </td>

            <td
              v-if="$slots.actions"
              class="text-center"
            >
              <slot
                name="actions"
                :item="item"
              />
            </td>

          </tr>

        </tbody>

      </table>

    </div>

    <div
      v-if="pagination"
      class="p-6"
    >
      <BasePagination
        :current-page="currentPage"
        :total-pages="totalPages"
      />
    </div>

  </div>
</template>