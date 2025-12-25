const BASE_URL = "http://127.0.0.1:8000";

const api = {
  createComplaint: async (token, data) => {
    const response = await fetch(`${BASE_URL}/api/complaints`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  uploadImage: async (token, complaintId, imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(
      `${BASE_URL}/api/complaints/${complaintId}/image`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    return response.json();
  },

  getMyComplaints: async (token) => {
    const response = await fetch(`${BASE_URL}/api/complaints/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getAllComplaints: async (token) => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/admin/complaints",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
},

  updateComplaint: async (token, complaintId, data) => {
    const response = await fetch(
      `${BASE_URL}/api/admin/complaints/${complaintId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  },
};

export default api;
