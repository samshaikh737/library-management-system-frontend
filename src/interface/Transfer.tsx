// Interface for Book
interface Book {
  id: number;
  title: string;
}

// Interface for Branch
interface Branch {
  id: number;
  name: string;
}

// Interface for Transfer
interface Transfer {
  id: number;
  bookId: number;
  fromBranchId: number;
  toBranchId: number;
  quantity: number;
  transferDate: string;
  createdAt: string;
  updatedAt: string;
  Book: Book;
  fromBranch: Branch;
  toBranch: Branch;
}

export type TransferResponse = Transfer[];
