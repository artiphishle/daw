/**
 * TODO #5 Volume
 * url{https://github.com/scha-ch/daw/issues/5}
 */
export default function Volume({ volume = -100 }: IVolumeProps) {
  return <div className="py-2 h-20">{volume}</div>;
}

interface IVolumeProps {
  volume?: number;
}
