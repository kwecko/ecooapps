export interface OrderCompleteDTO {
    id: string;
    user_id: string;
    amount: number;
    status: "RECEIVED" | "CANCELLED" | "PENDING";
    created_at: Date;
    updated_at: Date | null;
    offer: {
      id: string;
      farm_id: string;
      cycle_id: string;
      price: number;
      amount: number;
      description: string | null;
      created_at: Date;
      updated_at: Date | null;
      product: {
        id: string;
        name: string;
        pricing: "UNIT" | "WEIGHT";
        image: string;
        created_at: Date;
        updated_at: Date | null;
      };
    };
}
    