export default function FilesList({files}) {
    return (
        <div className="w-full mt-6 border-t-8 border-gray-200 border-r-2 border-l-2 border-b-2 h-5/6">
            {
                files.map((file,i) => (
                    <div key={i}>{file}</div>
                ))
            }
        </div>
    )
}
