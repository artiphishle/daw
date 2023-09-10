import useSWR, { useSWRConfig, type Fetcher } from "swr";

import type { IConfig } from "@/pages/api/project/settings";

export default function useProjectSettings() {
  const { mutate } = useSWRConfig();
  const fetcher: Fetcher<IConfig, string> = (key: string) =>
    fetch(key).then((res) => res.json());

  const {
    data: projectSettings,
    isLoading,
    error,
  } = useSWR("/api/project/settings", fetcher);

  const updateProjectSettings = async (data: Partial<IConfig>) => {
    await fetch("/api/project/settings", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    mutate("/api/project/settings");
  };

  return { projectSettings, isLoading, error, updateProjectSettings };
}
