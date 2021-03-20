import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Modal from "./Modal";

interface OCRModalProps {
  files: [string];
  ocrImageIndex: number;
  onClose?: () => void;
}
export default function OCRModal({
  files,
  ocrImageIndex,
  onClose,
}: OCRModalProps) {
  const [OCRText, setOCRText] = useState<string>(null);
  const [timeTaken, setTimeTaken] = useState(0);
  useEffect(() => {
    if (files[ocrImageIndex] === undefined) return;
    setOCRText(null);
    const options: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        filename: files[ocrImageIndex],
      }),
    };
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/process/detect`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setTimeTaken(res.time);
        setOCRText(res.msg);
      })
      .catch(() => {
        setOCRText("Internal Server Error");
      });
  }, [ocrImageIndex]);
  return (
    <Modal isOpen={ocrImageIndex > -1} onClick={onClose} title={`Time taken: ${Boolean(OCRText)? `${timeTaken.toFixed(2)}ms`: "Processing..."}`}>
      <div className="px-4 py-2 flex">
        <div className="w-1/2 p-2">
          {files[ocrImageIndex] !== undefined && (
            <img
              src={`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/file/getfile?filename=${files[ocrImageIndex]}`}
            />
          )}
        </div>
        <div className="border-l border-gray-300 w-1/2 p-2">
          {Boolean(OCRText) ? (
            <pre className="overflow-auto">{OCRText}</pre>
          ) : (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          )}
        </div>
      </div>
    </Modal>
  );
}
