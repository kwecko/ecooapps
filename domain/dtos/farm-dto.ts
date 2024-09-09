export interface FarmDTO {
    id: string;
    name: string;
    caf: string;
    active: boolean;
    admin_id: string;
    tax: number;
    created_at: Date;
    updated_at: Date | null;
  }