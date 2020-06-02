const rules = {
  buyer: {
    user: {
      static: [
        'buyer:view_navigation',
        'rfp:create',
        'rfp:view',
        'rfp:edit',
        'rfp:delete',
        'rbac:test',
      ],
    },
    admin: {
      static: [
        'rbac:test',
        'buyer:view_navigation',
        'rfp:create',
        'rfp:view',
        'rfp:edit',
        'rfp:delete',
        'user:view_all_users',
        'user:invite',
        'user:resend_invitation',
        'user:reset_password',
        'supplier:invite',
      ],
      dynamic: {
        'user:delete': ({ userID, currentUserID }) => {
          if (userID !== currentUserID) {
            return true;
          }
          return false;
        },
        'user:set_admin': ({ userID, currentUserID, type }) => {
          if ((type === 'user' && userID !== currentUserID) || (type === 'invitation')) {
            return true;
          }
          return false;
        },
      },
    },
  },
  supplier: {
    user: {
      static: [
        'supplier:view_navigation',
      ],
    },
    admin: {
      static: [
        'supplier:view_navigation',
      ],
    },
  },
};

export default rules;
