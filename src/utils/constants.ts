import { type User } from "../ormTypes";

export const EMPTY_USER: User = {
    id: -1,
    user_did: "",
    first_name: "",
    last_name: "",
    group_id: null,
    role_id: null,
    tag_id: null,
};