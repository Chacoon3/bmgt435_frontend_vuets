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
  },

  groups: {
    get: "bmgt435/api/groups/get",
    paginated: "bmgt435/api/groups/paginated",
    join:"bmgt435/api/groups/join",
    create:"bmgt435/api/groups/create",
    leave:"bmgt435/api/groups/leave",
  },

  tags:{
    tags: "bmgt435/api/tags",
    paginated: "bmgt435/api/tags/paginated",
  },

  roles:{
    roles: "bmgt435/api/roles",
    paginated: "bmgt435/api/roles/paginated",
  },

  cases:{
    get: "bmgt435/api/cases/get",
    paginated: "bmgt435/api/cases/paginated",
    run:"bmgt435/api/cases/run",
    submit:"bmgt435/api/cases/submit",
  },

  caseRecords: {
    get: "bmgt435/api/case-records/get",
    paginated: "bmgt435/api/case-records/paginated",
  },

  manage: {
    importUsers: "bmgt435/api/manage/import-users",
    viewUsers: "bmgt435/api/manage/view-users",
  }

};