<script setup>
import HeaderSearch from "./HeaderSearch.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import NotificationDropdown from "./NotificationDropdown.vue";
import UserDropdown from "./UserDropdown.vue";
</script>

<template>
  <header class="flex items-center justify-between border-b bg-white p-6">
    <HeaderSearch />

    <div class="flex items-center gap-4">
      <ThemeSwitcher />

      <NotificationDropdown />

      <UserDropdown />
    </div>
  </header>
</template>
