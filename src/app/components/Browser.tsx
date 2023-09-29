import { FileAudioIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import useSWR from "swr";
import { EEndpoint } from "../types/daw";

const fileStyle = "w-4 h-4 mr-2 fill-green-200";
const folderStyle = "w-4 h-4 mr-2 fill-blue-200";
const liStyle = "flex";

interface IThree {
  name: string;
  items?: IThree[];
}

// TODO extract to other file and load samples from server
function Three(three: IThree) {
  console.log(three);
  return (
    <ul>
      <li className={liStyle}>
        <FolderOpenIcon className={folderStyle} />
        Samples
        <ul className="mt-6 -ml-16 pl-4 border-l border-gray-400">
          {[three].map(({ name, items = [] }, threeIndex) => (
            <li key={`browser-three-${threeIndex}`} className={liStyle}>
              {name.includes(".") ? (
                <FileAudioIcon className={fileStyle} />
              ) : (
                <FolderIcon className={folderStyle} />
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
  const {
    data = [],
    isLoading,
    error,
  } = useSWR<IThree[], boolean, any>(EEndpoint.Browser, (endpoint: EEndpoint) =>
    fetch(endpoint).then((res) => res.json())
  );

  /*
  useEffect(() => {
    if (data) console.log(data);
  }, [data]);
*/
  return (
    <section className="flex bg-white pt-8 px-4 text-xs">
      <div className="pr-8">{data?.length && <Three {...data[0]} />}</div>
      <div className="flex-1 bg-gray-50">Content</div>
    </section>
  );
}

export default Browser;
