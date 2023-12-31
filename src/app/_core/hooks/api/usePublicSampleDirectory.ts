import useSWR from 'swr';

import { fetcher } from 'config/fetcher';

import { EEndpoint } from 'app/_common/types/api.types';
import type { IDirectory } from 'app/_common/types/fs.types';

const usePublicSampleDirectory = () => {
  const {
    data: dirItems,
    isLoading,
    error,
  } = useSWR<IDirectory[], Error, EEndpoint>(EEndpoint.Browser, fetcher);

  return { dirItems, isLoading, error };
};
export { usePublicSampleDirectory };
