const getHomepages = async () => {
  try {
    const response = await fetch(`/api/homepage`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};

const addHomepage = async (formData) => {
  try {
    const response = await fetch(`/api/homepage`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const updateHomepage = async (data) => {
  try {
    const response = await fetch(`/api/homepage`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const uploadImage = async (index, formData) => {
  try {
    const response = await fetch(`/api/homepage/image/${index}`, {
      method: 'PUT',
      body: formData,
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};

export { addHomepage, getHomepages, updateHomepage, uploadImage };
