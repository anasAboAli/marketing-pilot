import api from "@/api/axios";

const teamService = {
  async getAll() {
    const response = await api.get("/team");

    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/team/${id}`);

    return response.data;
  },

  async create(member) {
    const response = await api.post("/team", member);

    return response.data;
  },

  async update(id, member) {
    const response = await api.put(`/team/${id}`, member);

    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/team/${id}`);

    return response.data;
  },
};

export default teamService;