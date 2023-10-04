import { ChangeEvent, useState } from "react";

interface IRangeInput {
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  placeholder?: string;
  vertical?: boolean;
}

export default function RangeInput({
  id = `form-range-${Number(new Date())}`,
  min = 0,
  max = 100,
  initialValue = 0,
  placeholder = "0",
  step = 1,
}: IRangeInput) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="transform -rotate-90 m-auto w-2">
      <label title={id} htmlFor={id}>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          placeholder={placeholder}
          value={value}
          step={step}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setValue(parseInt(event.target.value, 10))
          }
        />
      </label>
    </div>
  );
}
