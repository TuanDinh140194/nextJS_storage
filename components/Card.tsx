/* eslint-disable tailwindcss/no-custom-classname */
import React from "react";
import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnails from "./Thumbnails";
import { convertFileSize } from "@/lib/utils";
import FormatDateTime from "./FormatDateTime";
import DropDownMenu from "./DropDownMenu";

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link href={file.url} target="_blank" className="file-card">
      <div className="flex justify-between">
        <Thumbnails
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />

        <div className="flex flex-col items-end justify-between">
          <DropDownMenu file = {file}/>
          <p className="body-1">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{file.name}</p>
        <FormatDateTime
          date={file.$createdAt}
          className="body-2 text-light-100"
        />

        <p className="caption text-light-200 line-clamp-1">
          By: {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
};

export default Card;
