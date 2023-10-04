import { useState } from "react";

const useActiveState = <T>(initialActive: T) => {
  const [active, setActive] = useState<T>(initialActive);

  return { active, setActive };
};

export { useActiveState };
