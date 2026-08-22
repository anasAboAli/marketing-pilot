<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold">التحليلات</h1>

      <p class="mt-2 text-slate-500">تحليل أداء الحملات والإعلانات</p>
    </div>

    <div id="super" class="grid grid-cols-4 gap-6">
      <div class="element rounded-2xl bg-white p-6 shadow-sm border">
        <p class="text-slate-500">إجمالي الإيرادات</p>

        <h2 class="mt-3 text-3xl font-bold">148,200 ر.س</h2>
      </div>

      <div class="element rounded-2xl bg-white p-6 shadow-sm border">
        <p class="text-slate-500">متوسط ROAS</p>

        <h2 class="mt-3 text-3xl font-bold">4.7x</h2>
      </div>

      <div class="element rounded-2xl bg-white p-6 shadow-sm border">
        <p class="text-slate-500">CTR</p>

        <h2 class="mt-3 text-3xl font-bold">6.4%</h2>
      </div>

      <div class="element rounded-2xl bg-white p-6 shadow-sm border">
        <p class="text-slate-500">معدل التحويل</p>

        <h2 class="mt-3 text-3xl font-bold">8.3%</h2>
      </div>
    </div>
  </div>
</template>

<style>
@media (max-width: 668px) {
  #super {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    gap: 20px;
    justify-content: center;
  }
  .element {
    width: 40%;
  }
  .element h2 {
    font-size: 20px;
  }
}
</style>
