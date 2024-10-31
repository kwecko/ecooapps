import { AppID } from "../library/types/app-id";

export const tokenKeys: Record<AppID, string> = {
  PRODUCER: 'producer_token',
  CDD: 'cdd_token',
  CONSUMER: 'consumer_token'
}