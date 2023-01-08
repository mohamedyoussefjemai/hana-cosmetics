const getFootersByAdmin = async () => {
  try {
    const response = await fetch(`/api/footer/get`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};

const addFooter = async (data) => {
  try {
    const response = await fetch(`/api/footer`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const updateFooter = async (data) => {
  try {
    const response = await fetch(`/api/footer`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};

export { addFooter, getFootersByAdmin, updateFooter };
