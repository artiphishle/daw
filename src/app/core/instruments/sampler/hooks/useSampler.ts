import { Sampler, type SamplerOptions } from "tone";

export default function useSampler({
  baseUrl = "/",
  ...rest
}: Partial<SamplerOptions>) {
  return new Sampler({ baseUrl, ...rest });
}
