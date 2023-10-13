import useSWR from "swr";

import { fetcher } from "@/core/config/fetcher";

import { EEndpoint } from "@/types/api.types";
import type { IDirectory } from "@/types/fs.types";

const usePublicSampleDirectory = () => {
  const {
    data: dirItems,
    isLoading,
    error,
  } = useSWR<IDirectory[], Error, EEndpoint>(EEndpoint.Browser, fetcher);

  return { dirItems, isLoading, error };
};
export { usePublicSampleDirectory };
