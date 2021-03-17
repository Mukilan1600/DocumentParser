import { ChangeEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import useFiles from "../components/Stores/useFiles";
import FileList from "../components/FilesList";
import useUser from "../components/Stores/useUser";

var msgTimeout: NodeJS.Timeout;

export default function home() {
  const { files, mutateFiles } = useFiles();
  const [msg, setMsg] = useState("");
  useUser({ redirectTo: "/login" });

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length < 1) return;
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    try {
      const res = await fetch("http://localhost:8000/api/file/addfile", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      var data = await res.json();
      if (res.status === 200) {
        setMsg(data.msg);
        var newFiles = [...files];
        newFiles.push(event.target.files[0].name);
        mutateFiles(newFiles);
        setMsgTimeout();
      }
    } catch (err) {
      setMsg("Internal server error");
      setMsgTimeout();
    }
  };

  const setMsgTimeout = () => (msgTimeout = setTimeout(() => setMsg(""), 5000));

  useEffect(() => {
    return () => {
      clearTimeout(msgTimeout);
    };
  }, []);

  return (
    <div className="sm:mt-8 sm:py-6 sm:px-8 mt-4 py-4 px-6 sm:max-w-lg mx-auto bg-white rounded-md h-5/6">
      <div className="flex space-x-2">
        <label
          htmlFor="upload_file"
          className="w-max cursor-pointer px-2 py-1 flex items-center bg-green-600 hover:border-green-500 border hover:bg-green-700 focus:outline-none focus:border-green-500 shadow-md rounded-lg text-white text-lg"
        >
          Add file
        </label>
        <div>{msg}</div>
        <input
          id="upload_file"
          name="upload_file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
      </div>
      <FileList files={files} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  var cookies = "";
  Object.keys(req.cookies).forEach((key, i) => {
    cookies += (i > 0 ? "; " : "") + key + "=" + req.cookies[key];
  });
  var res = await fetch("http://localhost:8000/api/user/authenticate", {
    headers: { cookie: cookies },
    credentials: "include",
  });

  if (res.status === 401) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
