interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
export type UserResponse = User[];