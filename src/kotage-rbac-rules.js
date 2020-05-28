const rules = {
  buyer: {
    user: {
      static: [
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
        'rfp:create',
        'rfp:view',
        'rfp:edit',
        'rfp:delete',
        'user:invite',
        'user:resend_invitation',
        'user:reset_password',
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
};

export default rules;
