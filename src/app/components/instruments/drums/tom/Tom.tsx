export enum ETom {
  Hi,
  Mid,
  Lo,
}

interface ITomProps {
  kind: ETom;
}

export default function Tom({ kind }: ITomProps) {
  return <div>Tom</div>;
}
