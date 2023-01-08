const getShops = async () => {
  try {
    const response = await fetch(`/api/shops`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const getShopById = async (id) => {
  try {
    const response = await fetch(`/api/shops/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const addShop = async (data) => {
  try {
    const response = await fetch(`/api/shops`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const updateShop = async (id, data) => {
  try {
    const response = await fetch(`/api/shops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const updateShopVisibility = async (id) => {
  try {
    const response = await fetch(`/api/shops/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};

export { addShop, getShops, getShopById, updateShop, updateShopVisibility };
