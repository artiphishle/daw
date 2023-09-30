import useSWR, { type Fetcher } from "swr";
import type { ITree } from "@/app/types/daw";

const usePublicSampleDirectory = () => {
  const endpointBrowser = "/api/browser";

  /**
   * Fetch (GET)
   */
  const fetcher: Fetcher<ITree[], string> = (endpoint: string) =>
    fetch(endpointBrowser).then((res) => res.json());

  const {
    data: tree,
    isLoading,
    error,
  } = useSWR<ITree[], boolean, any>(endpointBrowser, fetcher, {
    revalidateOnFocus: false,
  });

  return { tree, isLoading, error };
};

export { usePublicSampleDirectory };
