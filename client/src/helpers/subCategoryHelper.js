const getSubCategories = async () => {
  try {
    const response = await fetch(`/api/sub-categories`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const getSubCategoryById = async (id) => {
  try {
    const response = await fetch(`/api/sub-categories/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const addSubCategory = async (data) => {
  try {
    const response = await fetch(`/api/sub-categories`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const updateSubCategory = async (id, data) => {
  try {
    const response = await fetch(`/api/sub-categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const updateSubCategoryVisibility = async (id) => {
  try {
    const response = await fetch(`/api/sub-categories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};

export {
  addSubCategory,
  getSubCategories,
  updateSubCategory,
  getSubCategoryById,
  updateSubCategoryVisibility,
};
