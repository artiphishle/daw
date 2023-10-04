import useSWR from "swr";
import { EEndpoint, type IDirItem } from "@/app/types/daw";
import { fetcher } from "@/app/core/config/fetcher";

/*
const fetcher: BareFetcher<IDirItem[]> = async (url: string) => {
  const res = await fetch(url);
  return await res.json();
};
*/

const usePublicSampleDirectory = () => {
  const {
    data: dirItems,
    isLoading,
    error,
  } = useSWR<IDirItem[], Error, EEndpoint>(EEndpoint.Browser, fetcher);

  return { dirItems, isLoading, error };
};
export { usePublicSampleDirectory };
