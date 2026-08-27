import api from "@/api/axios";

const settingsService = {
  async get() {
    const response = await api.get("/settings");

    return response.data;
  },

  async update(data) {
    const response = await api.put("/settings", data);

    return response.data;
  },
};

export default settingsService;