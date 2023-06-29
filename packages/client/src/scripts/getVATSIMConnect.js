const getVATSIMConnect = () => {
  const dev = false;
  const client_id = 1191;
  const redirect_uri = "https://czqm.ca/auth";

  // const dev = true;
  // const client_id = 519;
  // const redirect_uri = "http://localhost:3000/auth";

  // const dev = true;
  // const client_id = 578;
  // const redirect_uri = "http://czqm.koskie.ca/auth";

  return `https://auth${
    dev ? "-dev" : ""
  }.vatsim.net/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=full_name+email+vatsim_details+country`;
};

export default getVATSIMConnect;
