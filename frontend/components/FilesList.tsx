import {
  faFileImage,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface FileListProps {
  files: [string];
  mutateFiles: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
}

export default function FilesList({ files, mutateFiles }: FileListProps) {
  const [deleting, setDeleting] = useState<number>(null);

  const onDelete = (fileName: string, index: number) => {
    setDeleting(index);
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        filename: fileName,
      }),
    };
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/file/removefile`,
      options
    )
      .then((res) => {
        if (res.status === 200) {
          var newFiles = [...files];
          newFiles.splice(index, 1);
          mutateFiles({ files: newFiles }, false);
        }
      })
      .finally(() => {
        setDeleting(null);
      });
  };

  return (
    <div className=" w-full mt-6 border-t-8 shadow-inner overflow-auto border-gray-200 border-r-2 border-l-2 border-b-2 h-5/6 flex flex-col">
      {files.map((file, i) => (
        <div
          key={i}
          className={`flex justify-between px-4 py-2 ${
            i < 1 && "border-t"
          } border-b border-black`}
        >
          <div className="w-1/2 overflow-ellipsis whitespace-nowrap overflow-hidden">
            <FontAwesomeIcon icon={faFileImage} />{" "}
            <span title={file}>{file}</span>
          </div>
          <div>
            <FontAwesomeIcon
              icon={deleting && deleting === i ? faSpinner : faTrash}
              color="red"
              className={`cursor-pointer ${
                deleting && deleting === i && "animate-spin"
              }`}
              onClick={onDelete.bind(this, file, i)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
