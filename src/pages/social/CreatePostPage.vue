<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

إنشاء منشور

</h1>

<div class="grid grid-cols-2 gap-6">

<BaseInput

label="عنوان المنشور"/>

<BaseSelect

label="القناة"

:options="[

'Facebook',

'Instagram',

'LinkedIn',

'TikTok',

'X'

]"/>

<div class="col-span-2">

<textarea

rows="8"

class="w-full rounded-xl border px-4 py-3"

placeholder="اكتب محتوى المنشور...">

</textarea>

</div>

<BaseButton>

حفظ

</BaseButton>

</div>

</div>

</template>