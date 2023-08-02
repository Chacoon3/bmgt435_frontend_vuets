// DB ORM types

export type User = {
    id: number;
    user_did: string;
    first_name: string;
    last_name: string;
    group_id: number | null;
    role_id: number | null;
    tag_id: number | null;
  };
  
  export type Case = {
    id: number;
    name: string;
    description: string;
  };
  
  export type Group = {
    id: number;
    name: string;
  };
  
  export type Role = {
    id: number;
    name: string;
  };
  
  export type Tag = {
    id: number;
    name: string;
  };


  // Server-created types
  export type GroupInfo = {
    group: Group;
    users: User[];
  };