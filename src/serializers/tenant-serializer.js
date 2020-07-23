export const serializeTenant = (tenant) => ({
  id: tenant.id,
  company_name: tenant.name,
  phone: tenant.phone,
  email: tenant.email,
  timezone: tenant.timezone,
  country: tenant.country,
  website_url: tenant.website,
});

export const deserializeTenant = (tenant) => ({
  id: tenant.id,
  account_id: tenant.account_id,
  name: tenant.company_name,
  phone: tenant.phone,
  email: tenant.email,
  country: tenant.country,
  website: tenant.website_url,
});
