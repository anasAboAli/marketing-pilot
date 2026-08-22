import api from "@/api/axios";
import endpoints from "@/api/endpoints";

export default {
  async getAll() {
    const response = await api.get(endpoints.campaigns);

    return response.data;
  },

  async getById(id) {
    const response = await api.get(
      `${endpoints.campaigns}/${id}`
    );

    return response.data;
  },

  async create(data) {
    const response = await api.post(
      endpoints.campaigns,
      data
    );

    return response.data;
  },

  async update(id, data) {
    const response = await api.put(
      `${endpoints.campaigns}/${id}`,
      data
    );

    return response.data;
  },

  async delete(id) {
    const response = await api.delete(
      `${endpoints.campaigns}/${id}`
    );

    return response.data;
  },

  async getByClientId(clientId) {
    const response = await api.get(
      `${endpoints.campaigns}/client/${clientId}`
    );

    return response.data;
  },
};