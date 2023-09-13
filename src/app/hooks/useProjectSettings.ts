import useSWR, { useSWRConfig, type Fetcher } from "swr";

import { EEndpoint } from "@/pages/api/constants";
import type { IProjectSettings } from "@/app/core/config/types";

export default function useProjectSettings() {
  const { mutate } = useSWRConfig();
  const fetcher: Fetcher<IProjectSettings, EEndpoint> = (endpoint: EEndpoint) =>
    fetch(endpoint).then((res) => res.json());

  const {
    data: projectSettings,
    isLoading,
    error,
  } = useSWR(EEndpoint.ProjectSettings, fetcher);

  const updateProjectSettings = async (patch: Partial<IProjectSettings>) => {
    await fetch(EEndpoint.ProjectSettings, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });

    mutate(EEndpoint.ProjectSettings);
  };

  return { projectSettings, isLoading, error, updateProjectSettings };
}
