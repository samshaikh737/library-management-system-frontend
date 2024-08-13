interface User {
  id: number;
  name: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
}

interface Checkout {
  id: number;
  bookId: number;
  userId: number;
  checkoutDate: string;
  returnDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  User: User;
  Book: Book;
  Branch?: {
    id: number;
    name: string;
  }
}
export type CheckoutResponse = Checkout[];