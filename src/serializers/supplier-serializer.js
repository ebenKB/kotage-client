/* eslint-disable camelcase */
const deserializeSupplier = (supplier) => {
  const { tenant_supplier, id } = supplier;
  const { tenant } = tenant_supplier;
  const newSupplier = {
    id,
    email: tenant.email,
    company_name: tenant.company_name,
    phone: tenant.phone,
    account_id: tenant.account_id,
    country: tenant.country,
    timezone: tenant.timezone,
  };
  console.log('This is the new supplier', newSupplier);
  return newSupplier;
};
export default deserializeSupplier;
