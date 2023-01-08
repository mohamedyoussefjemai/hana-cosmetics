const getCategories = async () => {
  try {
    const response = await fetch(`/api/categories`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const getCategoryById = async (id) => {
  try {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const addCategory = async (formData) => {
  try {
    const response = await fetch(`/api/categories`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const updateCategory = async (id, formData) => {
  try {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      body: formData,
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const updateCategoryVisibility = async (id) => {
  try {
    const response = await fetch(`/api/categories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};

export {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  updateCategoryVisibility,
};
