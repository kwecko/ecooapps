'use server';

import ApiService from '@shared/service';

export interface ListBoxesRequest {
  cycle_id: string;
  page: number;
  farm?: string;
  since?: string;
}

export async function listBoxes({
  cycle_id,
  page,
  farm = '',
  since = '',
}: ListBoxesRequest) {
  let url = `/boxes?cycle_id=${cycle_id}&page=${page}`;

  if (farm) {
    url += `&farm=${farm}`;
  }
  if (since) {
    url += `&since=${since}`;
  }
  const response = ApiService.GET({
    url,
  });

  return response;
}
