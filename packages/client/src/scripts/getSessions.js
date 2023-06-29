import axios from "axios";

const getSessions = async (filter = "") => {
  const { sessions } = (await axios.get(`/api/stats/${filter}`)).data;

  return sessions;
};

export default getSessions;
