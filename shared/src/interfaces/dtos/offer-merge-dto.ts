import { CatalogDTO, OfferDTO } from "@shared/interfaces/dtos";

export interface OfferMergeDTO extends Omit<OfferDTO, "catalog_id"> {
  catalog: CatalogDTO;
}
