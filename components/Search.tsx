/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Models } from "node-appwrite";
import { getFiles } from "@/lib/appwrite/actions/file.action";
import Thumbnails from "./Thumbnails";
import FormatDateTime from "./FormatDateTime";
import { useDebounce } from 'use-debounce';


const Search = () => {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [result, setResult] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const path = usePathname();
  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedSearch.length === 0) {
        setResult([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }
      const files = await getFiles({ searchText: debouncedSearch, types: [] });
      setResult(files.documents);
      setOpen(true);
    };

    fetchFiles();
  }, [debouncedSearch]);

  useEffect(() => {
    if (!searchQuery) {
      setSearch("");
    }
  }, [searchQuery]);

  const handleClick = (file: Models.Document) => {
    setOpen(false);
    setResult([]);

    router.push(`/${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${search}`);
  };

  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image
          src={"/assets/icons/search.svg"}
          alt="Search"
          width={24}
          height={24}
        />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ..."
          className="search-input"
        />

        {open && (
          <ul className="search-result">
            {result.length > 0 ? (
              result.map((file) => (
                <li
                  className="flex items-center justify-between"
                  key={file.$id}
                  onClick={() => handleClick(file)}
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnails
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className="subtitle-2 text-light-100 line-clamp-1">
                      {file.name}
                    </p>
                  </div>

                  <FormatDateTime
                    date={file.$createdAt}
                    className="caption text-light-200 line-clamp-1"
                  />
                </li>
              ))
            ) : (
              <p className="empty-result">No files found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
