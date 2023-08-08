export const endpoints = {
  auth:{
    signIn: "bmgt435/api/auth/sign-in",
    signUp: "bmgt435/api/auth/sign-up",
    signOut: "bmgt435/api/auth/sign-out",
    forgetPassword: "bmgt435/api/auth/forget-password",
  },

  users:{
    me: "bmgt435/api/users/me",
    users: "bmgt435/api/users",
    usersPaginated: "bmgt435/api/users/paginated",
  },

  groups: {
    groups: "bmgt435/api/groups",
    groupsPaginated: "bmgt435/api/groups/paginated",
    join:"bmgt435/api/groups/join",
    leave:"bmgt435/api/groups/leave",
  },

  tags:{
    tags: "bmgt435/api/tags",
    tagsPaginated: "bmgt435/api/tags/paginated",
  },

  roles:{
    roles: "bmgt435/api/roles",
    rolesPaginated: "bmgt435/api/roles/paginated",
  },

  cases:{
    cases: "bmgt435/api/cases",
    casesPaginated: "bmgt435/api/cases/paginated",
    run:"bmgt435/api/cases/run",
    caseRecords: "bmgt435/api/case-records",
    caseRecordsPaginated: "bmgt435/api/case-records/paginated",
  }

};