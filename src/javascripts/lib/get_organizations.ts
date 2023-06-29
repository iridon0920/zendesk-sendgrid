export const GetOrganizations = async (client: any) => {
  const options = {
    url: "/api/v2/organizations",
    type: "GET",
    autoRetry: false,
  };

  const result = await client.request(options);
  return result.organizations.map((organization: any) => ({
    id: organization.id,
    name: organization.name,
  }));
};
