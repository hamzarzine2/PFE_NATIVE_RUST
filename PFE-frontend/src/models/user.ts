export type User = {
  email: string;
  first_name: string;
  is_admin?: boolean; // optional because we don't have this field in register
  is_verified?: boolean;// optional because we don't have this field in register
  last_name: string;
  phone: string;
  user_id?: number; // optional because we don't have this field in register
  password?: string; // optional because we don't want to store the password in the user object in the storage (security)
};