<template>
  <div class="app-logo">
    <div class="app-logo__icon">
      MP
    </div>

    <div class="app-logo__content">
      <h1 class="app-logo__title">
        MarketPilot
      </h1>

      <p class="app-logo__subtitle">
        Marketing Platform
      </p>
    </div>
  </div>
</template>

<script setup>
// لا يوجد منطق حالياً
</script>

<style scoped>
.app-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-logo__icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);

  display: flex;
  justify-content: center;
  align-items: center;

  background: var(--primary);
  color: white;

  font-size: 18px;
  font-weight: 700;

  box-shadow: var(--shadow-sm);
}

.app-logo__title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}

.app-logo__subtitle {
  margin-top: 2px;
  font-size: 13px;
  color: var(--text-secondary);
}
</style>