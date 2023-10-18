"use client";
import {
  FileAudioIcon,
  FolderIcon,
  FolderOpenIcon,
  Loader,
} from "lucide-react";

import styles from "app/common/styles";
import { usePublicSampleDirectory } from "@/core/hooks/api/usePublicSampleDirectory";

import type { IDirectory } from "app/common/types/fs.types";

// TODO extract to other file and load samples from server
function Three({ dirItems }: { dirItems: IDirectory[] }) {
  console.info("[Browser]", dirItems);
  const css = styles.browser;
  return (
    <ul>
      <li className={css.liStyle}>
        <FolderOpenIcon className={css.folderStyle} />
        Samples
        <ul className="mt-6 -ml-16 pl-4 border-l border-gray-400">
          {dirItems.map(({ name, dirs = [] }, threeIndex) => (
            <li key={`browser-three-${threeIndex}`} className={css.liStyle}>
              {name.includes(".") ? (
                <FileAudioIcon className={css.fileStyle} />
              ) : (
                <FolderIcon className={css.folderStyle} />
              )}
              {name}
              {dirs.length ? (
                <ul className="mt-6 -ml-16 pl-4 border-l border-gray-400">
                  {dirs.map(({ name }, itemsIndex) => (
                    <li key={`item-${name}-${itemsIndex}`}>{name}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}

function Browser() {
  const { dirItems, error } = usePublicSampleDirectory();
  if (error) throw error;

  return (
    <section className="flex flex-1 bg-white pt-8 px-4 text-xs">
      <div className="pr-8">
        {dirItems?.length ? <Three dirItems={[...dirItems]} /> : <Loader />}
      </div>
      <div className="flex-1 bg-gray-50">Content</div>
    </section>
  );
}

export default Browser;
