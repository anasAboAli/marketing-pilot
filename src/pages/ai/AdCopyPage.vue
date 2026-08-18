<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

مولد النصوص الإعلانية

</h1>

<BaseInput

label="اسم المنتج"/>

<BaseSelect

label="المنصة"

:options="[

'Google Ads',

'Meta Ads',

'TikTok Ads'

]"/>

<textarea

rows="8"

class="mt-6 w-full rounded-xl border px-4 py-3">

</textarea>

</div>

</template>