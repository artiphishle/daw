import useSWR from "swr";

import { fetcher } from "@/app/core/config/fetcher";

import { EEndpoint } from "@/types/api";
import type { IDirectory } from "@/types/fs";

const usePublicSampleDirectory = () => {
  const {
    data: dirItems,
    isLoading,
    error,
  } = useSWR<IDirectory[], Error, EEndpoint>(EEndpoint.Browser, fetcher);

  return { dirItems, isLoading, error };
};
export { usePublicSampleDirectory };
