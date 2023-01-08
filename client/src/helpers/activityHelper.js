const getActivities = async () => {
  try {
    const response = await fetch(`/api/activities`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const getActivityById = async (id) => {
  try {
    const response = await fetch(`/api/activities/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const addActivity = async (data) => {
  try {
    const response = await fetch(`/api/activities`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};
const updateActivity = async (id, data) => {
  try {
    const response = await fetch(`/api/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  } catch (err) {
    return { alert: err.message };
  }
};

export { addActivity, getActivities, getActivityById, updateActivity };
