import {
  faFileImage,
  faSpinner,
  faTrash,
  faDownload,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import { saveAs } from "file-saver";

interface FileListProps {
  files: [string];
  mutateFiles: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
  setOcrImageIndex: Dispatch<SetStateAction<number>>;
}

export default function FilesList({
  files,
  mutateFiles,
  setOcrImageIndex,
}: FileListProps) {
  const [deleting, setDeleting] = useState<number>(null);
  const [downloading, setDownloading] = useState<number>(null);

  const onDelete = (filename: string, index: number) => {
    setDeleting(index);
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        filename,
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

  const onDownload = (filename: string, index: number) => {
    setDownloading(index);
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    };
    var url = new URL(
      `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/file/getfile`
    );
    const queryParams = { filename };
    url.search = new URLSearchParams(queryParams).toString();
    console.log(url.toString());
    fetch(url.toString(), options)
      .then(async (res) => {
        if (res.status === 200) {
          var blob = await res.blob();
          saveAs(blob, filename);
        }
      })
      .finally(() => {
        setDownloading(null);
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
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon
              icon={deleting !== null && deleting === i ? faSpinner : faTrash}
              color="red"
              className={`cursor-pointer ${
                deleting !== null && deleting === i && "animate-spin"
              }`}
              onClick={onDelete.bind(this, file, i)}
            />
            <FontAwesomeIcon
              icon={
                downloading !== null && downloading === i
                  ? faSpinner
                  : faDownload
              }
              color={`${
                downloading !== null && downloading !== i ? "grey" : "green"
              }`}
              className={`${downloading === null && "cursor-pointer"} ${
                downloading !== null && downloading === i && "animate-spin"
              }`}
              onClick={
                downloading === null ? onDownload.bind(this, file, i) : null
              }
            />
            <FontAwesomeIcon
              icon={faEye}
              color="blue"
              className="cursor-pointer"
              onClick={setOcrImageIndex.bind(this, i)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
