export interface Branch {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
  }

export type BranchResponse = Branch[];