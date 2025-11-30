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

  const params = new URLSearchParams();

  params.append('cycle_id', cycle_id);
  params.append('page', page.toString());

  if (farm) {
    params.append('farm', farm);
  }
  if (since) {
    params.append('since', since);
  }

  const response = ApiService.GET({
    url: `/boxes?${params.toString()}`,
  });

  return response;
}
