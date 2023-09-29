import { FileAudioIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import useSWR from "swr";
import { EEndpoint } from "../types/daw";

const fileStyle = "w-4 h-4 mr-2 fill-green-200";
const folderStyle = "w-4 h-4 mr-2 fill-blue-200";
const liStyle = "flex";

interface IThree {
  publicSamples: string[];
}

// TODO extract to other file and load samples from server
function Three({ publicSamples }: IThree) {
  return (
    <ul>
      <li className={liStyle}>
        <FolderOpenIcon className={folderStyle} />
        Samples
        <ul>
          {publicSamples.map((name, dirIndex) => (
            <li key={`browser-three-${dirIndex}`} className={liStyle}>
              {name.endsWith(".wav") ? (
                <FileAudioIcon className={folderStyle} />
              ) : (
                <FolderIcon className={folderStyle} />
              )}
              {name}
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}

function Browser() {
  const { data, isLoading, error } = useSWR<string[], boolean, any>(
    EEndpoint.Browser,
    (endpoint: EEndpoint) => fetch(endpoint).then((res) => res.json())
  );

  /*
  useEffect(() => {
    if (data) console.log(data);
  }, [data]);
*/
  return (
    <section className="flex bg-white p-20 text-xs">
      <div className="pr-8">
        {data?.length && <Three publicSamples={data} />}
      </div>
      <div className="flex-1 bg-gray-50 p-20">Content</div>
    </section>
  );
}

export default Browser;
