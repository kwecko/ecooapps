import { FarmDTO } from './farm-dto';
import { OfferWithProductDTO } from './offer-with-product-dto';

export interface CatalogDTO {
    id: string;
    cycle_id: string;
    farm: FarmDTO;
    created_at: string;
    updated_at: string;
}

export interface CatalogMergeDTO {
    id: string;
    cycle_id: string;
    farm: FarmDTO;
    created_at: string;
    updated_at: string;
    offers: OfferWithProductDTO[];
}