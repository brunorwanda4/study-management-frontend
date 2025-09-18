import { ProfileImageModelGet } from "./imageModel";

export interface Gender {
  Male: "M"; // Male gender representation
  Female: "F"; // Female gender representation
  Other: "O"; // Other gender representation
}

export interface UserModelNew {
  name: string; // Full name of the user
  username?: string; // Username (optional)
  role: string; // Role ID associated with the user
  email: string; // Email address of the user
  phone?: string; // Phone number (optional)
  image?: string; // Image
  password: string; // Password for the user
  gender: keyof Gender; // Gender of the user, refers to the Gender interface
}

export interface UserModel {
  id: string; // id
  role?: string; // role id
  name: string; // name
  username?: string; // username
  email: string; // email
  phone?: string; // phone number
  password?: string; // password
  disable?: boolean; // disabled status
  gender?: keyof Gender; // gender
  create_on: string; // create date
  update_on?: string; // update date
  image?: ProfileImageModelGet[]; // Images
}

export interface UserModelPut {
  role?: string; // Role
  username?: string; // Username
  name?: string; // Name
  email?: string; // Email
  phone?: string; // Phone
  password?: string; // Password
  gender?: Gender; // Gender
  disable?: boolean; // Disabled status
  image?: string; // Image
}

export interface UserModelDeleteMany {
  users: string[]; // Array of user idisable
}

export interface UserModelUpdate {
  id: string; // id
  user: UserModelPut; // user object
}
export interface UserModelUpdateMany {
  users: UserModelUpdate[]; // Array of user idisable
}

// user role model
export type UserRoleModel = {
  id: string; // id
  role: string; // role
  create_on: string; // create date
  update_on?: string; // update date
};

export type UserRoleModelNew = {
  role: string; // role
};
