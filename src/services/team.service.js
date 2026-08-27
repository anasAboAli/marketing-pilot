const API_URL = "http://localhost:3001/api/team";

const teamService = {
  async getAll() {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load team members");
    }

    return response.json();
  },

  async create(member) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });

    if (!response.ok) {
      throw new Error("Failed to create team member");
    }

    return response.json();
  },

  async update(id, member) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });

    if (!response.ok) {
      throw new Error("Failed to update team member");
    }

    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete team member");
    }

    return response.json();
  },
};

export default teamService;