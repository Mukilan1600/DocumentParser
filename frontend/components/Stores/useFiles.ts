import useSWR from 'swr'


export default function useFiles(defaultFiles: [string]) {
    const {data, mutate: mutateFiles} = useSWR(`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/file/getfiles`)
    const files = data?.files;
    return {files: files??defaultFiles, mutateFiles, loading: !files}
}
