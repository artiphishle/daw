import { EEndpoint } from "@/types/api";

const fetcher = async (url: EEndpoint) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export { fetcher };
