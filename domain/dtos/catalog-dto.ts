import { FarmDTO } from '@shared/domain/dtos/farm-dto';

export interface CatalogDTO {
    id: string;
    cycle_id: string;
    farm: FarmDTO;
    created_at: string;
    updated_at: string;
}