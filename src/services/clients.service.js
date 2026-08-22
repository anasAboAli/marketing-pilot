import api from "@/api/axios";
import endpoints from "@/api/endpoints";

export default {
  async getAll() {
    const response = await api.get(
      endpoints.clients
    );

    return response.data;
  },

  async getById(id) {
    const response = await api.get(
      `${endpoints.clients}/${id}`
    );

    return response.data;
  },

  async create(data) {
    const response = await api.post(
      endpoints.clients,
      data
    );

    return response.data;
  },

  async update(id, data) {
    const response = await api.put(
      `${endpoints.clients}/${id}`,
      data
    );

    return response.data;
  },

  async delete(id) {
    const response = await api.delete(
      `${endpoints.clients}/${id}`
    );

    return response.data;
  },

  
};