export interface Bill {
  id: string;
  billNumber: string;
  vendor: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  category: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  department: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

export interface FilterOptions {
  search?: string;
  status?: string[];
  category?: string[];
  dateRange?: [string, string];
  amountRange?: [number, number];
}

export interface UploadResult {
  success: boolean;
  message: string;
  data?: Bill[];
  errors?: string[];
}