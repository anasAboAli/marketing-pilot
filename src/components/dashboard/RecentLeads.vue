<script setup>
const leads = [
  {
    name: "Ahmed Ali",
    company: "ABC Real Estate",
    status: "New",
    value: "$2,500",
  },
  {
    name: "Sara Mohamed",
    company: "Elite Clinic",
    status: "Qualified",
    value: "$1,800",
  },
  {
    name: "Omar Hassan",
    company: "Modern Store",
    status: "Contacted",
    value: "$3,200",
  },
  {
    name: "Lina Khaled",
    company: "Travel Plus",
    status: "Won",
    value: "$5,400",
  },
];
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 p-6">
      <h3 class="text-lg font-semibold text-slate-900">
        Recent Leads
      </h3>

      <p class="mt-1 text-sm text-slate-500">
        Latest customer leads
      </p>
    </div>

    <table class="w-full">
      <thead>
        <tr class="text-left text-sm text-slate-500">
          <th class="p-4">Lead</th>
          <th>Company</th>
          <th>Status</th>
          <th>Value</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="lead in leads"
          :key="lead.name"
          class="border-t border-slate-100"
        >
          <td class="p-4 font-medium">
            {{ lead.name }}
          </td>

          <td>{{ lead.company }}</td>

          <td>
            <span
              class="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600"
            >
              {{ lead.status }}
            </span>
          </td>

          <td class="font-semibold">
            {{ lead.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>