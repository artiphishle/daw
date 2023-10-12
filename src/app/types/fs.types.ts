interface IDirectory {
  name: string;
  dirs?: IDirectory[];
}

export type { IDirectory };
