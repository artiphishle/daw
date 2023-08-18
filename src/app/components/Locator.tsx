import useTransport from "../hooks/useTransport";

export default function Locator() {
  const { position, progress } = useTransport();

  const oneMeasure = (window.screen.availWidth - 185) / 8;

  return (
    <div
      className={`absolute top-0 bottom-0 left-[${Math.floor(
        parseInt(position.toString()[0]) * oneMeasure
      )}px] w-0 right-auto border-r border-r-black bg-black h-full`}
    ></div>
  );
}
