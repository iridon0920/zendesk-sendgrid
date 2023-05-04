export const GetEndUsers = async (client: any) => {
  const options = {
    url: "/api/v2/users.json",
    type: "GET",
    autoRetry: false,
    data: {
      role: "end-user",
    },
  };

  return client.request(options);
};
