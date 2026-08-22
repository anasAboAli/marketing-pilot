import api from "@/api/axios";
import endpoints from "@/api/endpoints";

export default {
  async getAll() {
    const response = await api.get(
      endpoints.leads
    );

    return response.data;
  },

  async getById(id) {
    const response = await api.get(
      `${endpoints.leads}/${id}`
    );

    return response.data;
  },

  async create(data) {
    const response = await api.post(
      endpoints.leads,
      data
    );

    return response.data;
  },

  async update(id, data) {
    const response = await api.put(
      `${endpoints.leads}/${id}`,
      data
    );

    return response.data;
  },

  async delete(id) {
    const response = await api.delete(
      `${endpoints.leads}/${id}`
    );

    return response.data;
  },
};