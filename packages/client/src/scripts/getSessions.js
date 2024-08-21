import axios from "axios";

const getSessions = async (filter = "") => {
  const data = await axios.get(`${import.meta.env.VITE_API_ROUTE}/api/stats/${filter}`).catch(() => {});

  if (!data || !data.data.sessions) {
    return [];
  }

  return data.data.sessions;
};

export default getSessions;
