import { RoleModel } from './RoleModel';

type UserModel = {
  _id: string;
  name?: string;
  family?: string;
  username: string;
  email: string;
  mobile: string;
  address?: string;
  avatar?: string;
  role: RoleModel;
  token?: string;
  is_banned: boolean;
  is_active: boolean;
  createdAt: string;
};

export type GetUsersModel  = { users: UserModel[]; roles: RoleModel[] }

export type UserProileModel = {
  _id?: string;
  name: string;
  family: string;
  address: string;
  username: string;
  avatar?: string;
};

export type UserHistoryModel = {
  _id?: string;
  browser: string;
  versionBrowser: string;
  os: string;
  versionOs: string;
  ip: string;
  createdAt: string;
};

export default UserModel;
