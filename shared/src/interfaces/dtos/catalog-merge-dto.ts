import { CatalogDTO, OfferDTO } from "@shared/interfaces/dtos";

export interface CatalogMergeDTO extends CatalogDTO {
  offers: OfferDTO[];
}
