const getProducts = async () => {
  try {
    const response = await fetch(`/api/products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const getProductById = async (id) => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const addProduct = async (formData) => {
  try {
    const response = await fetch(`/api/products`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const updateProduct = async (id, formData) => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      body: formData,
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const updateProductVisibility = async (id) => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};

export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateProductVisibility,
};
