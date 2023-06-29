export const GetEndUsers = async (client: any, organizationId: string) => {
  const options = {
    url:
      organizationId !== ""
        ? `/api/v2/organizations/${organizationId}/users.json`
        : "/api/v2/users.json",
    type: "GET",
    autoRetry: false,
    data: {
      role: "end-user",
    },
  };

  const result = await client.request(options);
  return result.users.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));
};
