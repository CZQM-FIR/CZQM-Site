const getGreeting = () => {
  let hour = new Date().getHours();
  let greeting = `Good ${
    hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening"
  }`;

  return greeting;
};

export default getGreeting;
