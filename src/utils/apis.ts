export const endpoints = {
  auth: {
    signIn: "bmgt435-service/api/auth/sign-in",
    signUp: "bmgt435-service/api/auth/sign-up",
    signOut: "bmgt435-service/api/auth/sign-out",
    forgetPassword: "bmgt435-service/api/auth/forget-password",
  },

  users: {
    me: "bmgt435-service/api/users/me",
    users: "bmgt435-service/api/users",
  },

  groups: {
    get: "bmgt435-service/api/groups/get",
    paginated: "bmgt435-service/api/groups/paginated",
    join: "bmgt435-service/api/groups/join",
    leave: "bmgt435-service/api/groups/leave",
  },

  // tags: {
  //   tags: "bmgt435-service/api/tags",
  //   paginated: "bmgt435-service/api/tags/paginated",
  // },

  roles: {
    roles: "bmgt435-service/api/roles",
    paginated: "bmgt435-service/api/roles/paginated",
  },

  cases: {
    get: "bmgt435-service/api/cases/get",
    paginated: "bmgt435-service/api/cases/paginated",
    run: "bmgt435-service/api/cases/run",
    submit: "bmgt435-service/api/cases/submit",
  },

  caseRecords: {
    getRecord: "bmgt435-service/api/case-records/get",
    getFile: "bmgt435-service/api/case-records/file/get",
    paginated: "bmgt435-service/api/case-records/paginated",
  },

  leaderboard: {
    paginated: "bmgt435-service/api/leader-board/paginated",
  },

  feedback: {
    post: "bmgt435-service/api/feedback/post",
  },

  manage: {
    user: {
      import: "bmgt435-service/api/manage/user/import",
      view: "bmgt435-service/api/manage/user/view",
    },
    group: {
      create: "bmgt435-service/api/manage/group/create",
      viewPaginated: "bmgt435-service/api/manage/group/paginated",
    },
    semester: {
      create: "bmgt435-service/api/manage/semester/create",
      all: "bmgt435-service/api/manage/semester/all",
    },
    feedback: {
      paginated: "bmgt435-service/api/manage/feedback/paginated",
      get: "bmgt435-service/api/manage/feedback/",
    },
    system: {
      state: "bmgt435-service/api/manage/system/state",
    },
  },
};
