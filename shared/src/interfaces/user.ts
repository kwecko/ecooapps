export interface User {
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
