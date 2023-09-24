// import propTypes from "prop-types";

import { FileAudioIcon, FolderIcon, FolderOpenIcon } from "lucide-react";

const fileStyle = "w-4 h-4 mr-2 fill-green-200";
const folderStyle = "w-4 h-4 mr-2 fill-blue-200";
const liStyle = "flex";

// TODO extract to other file and load samples from server
function Three() {
  return (
    <ul>
      <li className={liStyle}>
        <FolderIcon className={folderStyle} />
        Folder 1
      </li>
      <li className={liStyle}>
        <FolderIcon className={folderStyle} />
        Folder 2
      </li>
      <li className={liStyle}>
        <FolderIcon className={folderStyle} />
        Presets
      </li>
      <li className={liStyle}>
        <FolderOpenIcon className={folderStyle} />
        Samples
        <ul className="mt-6 -ml-16 pl-4 border-l border-gray-400">
          <li className={liStyle}>
            <FolderIcon className={folderStyle} />
            Bank-01
          </li>
          <li className={liStyle}>
            <FolderIcon className={folderStyle} />
            Bank-02
          </li>
          <li className="flex">
            <FolderIcon className={folderStyle} />
            Bank-03
          </li>
          <li className="flex">
            <FolderIcon className={folderStyle} />
            Bank-04
          </li>
          <li className="flex">
            <FolderIcon className={folderStyle} />
            Bank-05
          </li>
          <li className="flex">
            <FileAudioIcon className={fileStyle} />
            halloween.mp3
          </li>
        </ul>
      </li>
    </ul>
  );
}

function Browser() {
  return (
    <section className="flex bg-white p-20 text-xs">
      <div className="pr-8">
        <Three />
      </div>
      <div className="flex-1 bg-gray-50 p-20">Content</div>
    </section>
  );
}

Browser.propTypes = {
  // TODO
};

export default Browser;
