export default function Container({ children }) {
  return (
    <div className="bg-white mt-16 sm:mx-auto sm:max-w-md sm:shadow-md space-y-4 px-10 py-6 h-4/6 flex flex-col justify-center items-center my-auto">
      {children}
    </div>
  );
}
