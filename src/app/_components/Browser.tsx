'use client';
import {
  FileAudioIcon,
  FolderIcon,
  FolderOpenIcon,
  MinusSquareIcon,
  PlusSquareIcon,
  SearchIcon,
} from 'lucide-react';

import { usePublicSampleDirectory } from 'app/_core/hooks/api/usePublicSampleDirectory';
import { Accordion } from 'packages/pfui';

import styles from 'app/_common/styles';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { IDirectory } from 'app/_common/types/fs.types';
const $ = styles.browser;

const DIR_BASE = '/api/directories';
const DIR_SAMPLES = `${DIR_BASE}samples/`;

export default function Browser() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState('');
  const [filterList, setFilterList] = useState<IDirectory[]>([]);

  const { dirItems = [], error } = usePublicSampleDirectory();
  if (error) throw error;

  useEffect(() => {
    if (!filter) return setFilterList(dirItems);

    setFilterList(dirItems.filter(({ name }) => name.includes(filter)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirItems, searchRef.current?.value]);

  function Search() {
    return (
      <div className="bg-gray-900 text-white relative">
        <input
          ref={searchRef}
          autoFocus={true}
          className="bg-transparent p-4"
          type="search"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFilter(event.currentTarget.value);
            searchRef.current?.focus();
          }}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            event.code === 'Enter' && setFilter(event.currentTarget.value);
          }}
          placeholder="Search..."
          value={filter}
        />
        <SearchIcon className="fill-white absolute top-0 bottom-0 w-2 h-2 left-2" />
      </div>
    );
  }

  function Details() {
    return filterList.map(({ name, items = [] }, dirIndex) => {
      const icon = items.length ? (
        <FolderIcon className={$.folderStyle} />
      ) : (
        <FileAudioIcon className={$.fileStyle} />
      );
      return (
        <li
          className="odd:bg-white p-2 border-b border-b-gray-200"
          key={`${name}-${dirIndex}`}
        >
          <a className="flex items-center gap-1">
            <PlusSquareIcon /> {icon} {name}
          </a>
        </li>
      );
    });
  }

  return (
    <section className="flex flex-col">
      <div className="flex bg-black text-white">
        <div className="w-[184px]">&nbsp;</div>
        <Search />
      </div>
      <section className="flex flex-1 bg-white px-4 text-xs">
        <div className="w-[184px]">&nbsp;</div>
        <div className="flex-1 bg-gray-50">
          <Accordion
            open={true}
            summary={
              <div className="flex gap-1 bg-blue-100">
                <MinusSquareIcon />
                <FolderOpenIcon />
                <label>Samples</label>
              </div>
            }
            details={
              <ul>
                <Details />
              </ul>
            }
          />
        </div>
      </section>
    </section>
  );
}
