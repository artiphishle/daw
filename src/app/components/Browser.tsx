import {
  FileAudioIcon,
  FolderIcon,
  FolderOpenIcon,
  Loader,
} from "lucide-react";

import styles from "@/app/core/config/styles";
import { usePublicSampleDirectory } from "@/app/core/hooks/usePublicSampleDirectory";

import type { ITree } from "@/app/types/daw";

// TODO extract to other file and load samples from server
function Three(three: ITree) {
  const css = styles.browser;
  return (
    <ul>
      <li className={css.liStyle}>
        <FolderOpenIcon className={css.folderStyle} />
        Samples
        <ul className="mt-6 -ml-16 pl-4 border-l border-gray-400">
          {[three].map(({ name, items = [] }, threeIndex) => (
            <li key={`browser-three-${threeIndex}`} className={css.liStyle}>
              {name.includes(".") ? (
                <FileAudioIcon className={css.fileStyle} />
              ) : (
                <FolderIcon className={css.folderStyle} />
              )}
              {name}
              {items.length && (
                <ul className="mt-6 -ml-16 pl-4 border-l border-gray-400">
                  {items.slice(0, 5).map(({ name }, itemsIndex) => (
                    <li key={`item-${name}-${itemsIndex}`}>{name}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}

function Browser() {
  const { tree, isLoading, error } = usePublicSampleDirectory();
  if (error) throw error;
  if (!tree) return <Loader />;

  console.log(tree);
  return (
    <section className="flex bg-white pt-8 px-4 text-xs">
      <div className="pr-8">{tree.length && <Three {...tree[0]} />}</div>
      <div className="flex-1 bg-gray-50">Content</div>
    </section>
  );
}

export default Browser;
