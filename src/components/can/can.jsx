import rbacrules from '../../kotage-rbac-rules';

const Check = (accountType, rules, role, action, data) => {
  const roleType = rules[accountType];
  const permissions = roleType[role];
  if (!permissions) {
    return false;
  }
  const staticPermissions = permissions.static;
  if (staticPermissions && staticPermissions.includes(action)) {
    return true;
  }

  const dynmaicPermissions = permissions.dynamic;
  if (dynmaicPermissions) {
    const permissionCondition = dynmaicPermissions[action];
    if (!permissionCondition) {
      return false;
    }
    return permissionCondition(data);
  }
  return false;
};

const Can = ({
  accountType, roleType, perform, yes, no, data,
}) => (
  Check(accountType, rbacrules, roleType, perform, data) ? yes() : no());

export default Can;
