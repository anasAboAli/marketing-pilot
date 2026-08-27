import api from "@/api/axios";
import endpoints from "@/api/endpoints";

const reportsService = {
  async getSummary(from, to) {
    const response = await api.get(
      endpoints.reportsSummary,
      {
        params: {
          from,
          to,
        },
      }
    );

    return response.data;
  },

  async analyzeWithAI(report) {
  const response = await api.post(
    endpoints.reportsAiAnalysis,
    {
      report,
    }
  );

  return response.data;
},
};

export default reportsService;