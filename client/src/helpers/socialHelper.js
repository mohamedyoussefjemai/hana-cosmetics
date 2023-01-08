const getSocials = async () => {
  try {
    const response = await fetch(`/api/socials`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const getSocialById = async (id) => {
  try {
    const response = await fetch(`/api/socials/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const updateSocialVisibility = async (id) => {
  try {
    const response = await fetch(`/api/socials/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};

export { getSocials, getSocialById, updateSocialVisibility };
