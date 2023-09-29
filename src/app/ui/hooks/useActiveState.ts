import { useState } from "react";

function useActiveState<T>(initialActive: T) {
  const [active, setActive] = useState<T>(initialActive);

  return { active, setActive };
}

export { useActiveState };
