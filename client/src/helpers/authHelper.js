const getCurrentUser = async () => {
  try {
    const response = await fetch(`/api/auth`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const logoutUser = async () => {
  try {
    const response = await fetch(`/api/auth`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const loginUser = async (data) => {
  try {
    const response = await fetch(`/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};

export { getCurrentUser, logoutUser, loginUser };
