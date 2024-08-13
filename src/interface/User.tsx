interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  Branch?: {
    id: number;
    name: string;
  }
}
export type UserResponse = User[];