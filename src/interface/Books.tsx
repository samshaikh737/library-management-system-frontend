export interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    quantity: number;
    currentBranch: string;
    status: 'available' | 'checked_out'; // Adjust based on possible status values
    isbn: string;
    createdAt: string;
    updatedAt: string;
    branchId: number | null;
}

export type BookResponse = Book[];