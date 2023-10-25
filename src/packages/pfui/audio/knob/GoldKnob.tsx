import classNames from 'classnames';
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';

/*** @design https://codepen.io/ykadosh/pen/LYOwdEZ */
export function GoldKnob({
  initialValue = 0,
  size = 80,
}: {
  initialValue?: number;
  size?: number;
}) {
  const [value, setValue] = useState(initialValue);
  const [previewValue, setPreviewValue] = useState(initialValue);
  const [inputVisible, setInputVisible] = useState(false);
  const [y, setY] = useState(0);

  return (
    <div
      className="goldknob"
      style={{ width: `${size}px`, height: `${size}px` }}
      onDoubleClick={() => {
        setInputVisible(true);
      }}
      onMouseDown={(event: MouseEvent) => {
        setY(event.clientY);
      }}
      onMouseUp={(event: MouseEvent) => {
        const newValue = value + (y - event.clientY);
        const finalValue = newValue < 0 ? 0 : newValue > 320 ? 320 : newValue;
        console.log('[GoldKnob] value:', finalValue);
        setValue(finalValue);
      }}
    >
      <div className="knob" style={{ transform: `rotate(${value}deg)` }}>
        <div className="teeth" />
        <div className="cap" />
        <div className="indicator" />
      </div>
      <div
        className={classNames({ hidden: !inputVisible })}
        style={{
          position: 'absolute',
          top: '5%',
          left: 0,
          right: 0,
          margin: 'auto',
          width: '50%',
          backgroundColor: 'rgba(255,255,255,.8)',
        }}
      >
        <input
          value={previewValue}
          className="text-center w-full bg-transparent font-bold"
          onChange={(event: ChangeEvent) => {
            const currentStringValue = (event.target as HTMLInputElement).value;
            if (!currentStringValue) return setPreviewValue(0);
            const currentValue = parseInt(currentStringValue, 10);
            setPreviewValue(
              currentValue < 0 ? 0 : currentValue > 320 ? 320 : currentValue
            );
          }}
          onKeyDown={(event: KeyboardEvent) => {
            if (event.key === 'Escape') return setInputVisible(false);
            if (event.key !== 'Enter') return;
            const currentStringValue = (event.target as HTMLInputElement).value;
            if (!currentStringValue) return setValue(0);
            const currentValue = parseInt(currentStringValue, 10);
            setValue(
              currentValue < 0 ? 0 : currentValue > 320 ? 320 : currentValue
            );
            setInputVisible(false);
          }}
        />
      </div>
    </div>
  );
}
