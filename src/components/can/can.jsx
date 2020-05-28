import rbacrules from '../../kotage-rbac-rules';

const Check = (accountType, rules, role, action, data) => {
  const roleType = rules[accountType];
  const permissions = roleType[role];
  if (!permissions) {
    return false;
  }
  const staticPermissions = permissions.static;
  console.log('These are the static permissions', permissions);
  if (staticPermissions && staticPermissions.includes(action)) {
    return true;
  }

  const dynmaicPermissions = permissions.dynamic;
  if (dynmaicPermissions) {
    const permissionCondition = dynmaicPermissions[action];
    if (!permissionCondition) {
      return false;
    }
    console.log('dynamic', data);
    return permissionCondition(data);
  }
  console.log('There are no dynamic conditions');
  return false;
};

const Can = (props) => (
  Check(props.accountType, rbacrules, props.roleType,
    props.perform, props.data) ? props.yes() : props.no());

export default Can;
