export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  roles: string[];
  verified_at: string;
  created_at: Date;
  updated_at: Date | null;
  password?: string;
  confirmPassword?: string;
}

export interface IUserUpdate {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface IAdmin {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date | null;
}
