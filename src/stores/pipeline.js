import { defineStore } from "pinia";
import leadsService from "@/services/leads.service";

const stageDefinitions = [
  {
    id: 1,
    name: "عميل جديد",
    statuses: ["جديد"],
  },
  {
    id: 2,
    name: "تم التواصل",
    statuses: ["تم التواصل"],
  },
  {
    id: 3,
    name: "عرض سعر",
    statuses: ["عرض سعر"],
  },
  {
    id: 4,
    name: "تم التعاقد",
    statuses: ["تم التعاقد"],
  },
];

export const usePipelineStore = defineStore("pipeline", {
  state: () => ({
    stages: stageDefinitions.map((stage) => ({
      ...stage,
      items: [],
    })),

    loading: false,
    error: "",
  }),

  getters: {
    totalLeads: (state) =>
      state.stages.reduce(
        (total, stage) => total + stage.items.length,
        0
      ),

    totalValue: (state) =>
      state.stages.reduce(
        (total, stage) =>
          total +
          stage.items.reduce(
            (sum, lead) => sum + Number(lead.value || 0),
            0
          ),
        0
      ),
  },

  actions: {
    async loadLeads() {
      try {
        this.loading = true;
        this.error = "";

        const leads = await leadsService.getAll();

        this.stages = stageDefinitions.map((stage) => ({
          ...stage,
          items: leads
            .filter((lead) =>
              stage.statuses.includes(lead.status)
            )
            .map((lead) => ({
              id: lead.id,
              client: lead.name,
              company: lead.company,
              value: Number(lead.value || 0),
              status: lead.status,
              source: lead.source,
              assignedTo: lead.assignedTo,
              phone: lead.phone,
              email: lead.email,
            })),
        }));
      } catch (error) {
        console.error("Pipeline load:", error);

        this.error =
          error.response?.data?.error ||
          error.message ||
          "تعذر تحميل بيانات المبيعات";

        this.stages = stageDefinitions.map((stage) => ({
          ...stage,
          items: [],
        }));
      } finally {
        this.loading = false;
      }
    },
  },
});