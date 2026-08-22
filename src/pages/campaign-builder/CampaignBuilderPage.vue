<script setup>
import Stepper from "@/components/campaign-builder/Stepper.vue";
import AudienceSelector from "@/components/campaign-builder/AudienceSelector.vue";
import BudgetCard from "@/components/campaign-builder/BudgetCard.vue";
import CreativeCard from "@/components/campaign-builder/CreativeCard.vue";
import ScheduleCard from "@/components/campaign-builder/ScheduleCard.vue";
import CampaignSummary from "@/components/campaign-builder/CampaignSummary.vue";

import { useCampaignBuilderStore } from "@/stores/campaignBuilder";

const builder = useCampaignBuilderStore();
</script>

<template>
  <div>
    <h1 class="mb-8 text-3xl font-bold">منشئ الحملات</h1>

    <Stepper :step="builder.step" />

    <div v-if="builder.step === 1">
      <BaseCard>
        <BaseInput label="اسم الحملة" />

        <BaseSelect
          label="المنصة"
          :options="['Google Ads', 'Meta Ads', 'TikTok Ads', 'Snapchat Ads']"
        />
      </BaseCard>
    </div>

    <div v-if="builder.step === 2">
      <AudienceSelector />
    </div>

    <div v-if="builder.step === 3">
      <BudgetCard />
    </div>

    <div v-if="builder.step === 4">
      <CreativeCard />
    </div>

    <div v-if="builder.step === 5">
      <ScheduleCard />
    </div>

    <div v-if="builder.step === 6">
      <CampaignSummary :campaign="builder.campaign" />
    </div>

    <div class="mt-8 flex justify-between">
      <BaseButton
        variant="secondary"
        @click="builder.previous"
        :disabled="builder.step === 1"
      >
        السابق
      </BaseButton>

      <BaseButton @click="builder.next" v-if="builder.step < 6">
        التالي
      </BaseButton>

      <BaseButton v-else> إنشاء الحملة </BaseButton>
    </div>
  </div>
</template>
