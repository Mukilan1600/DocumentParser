import {useEffect} from 'react'
import useSWR from 'swr'


export default function useFiles() {
    const {data, mutate: mutateFiles} = useSWR(`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/file/getfiles`)
    const files = data?.files;
    return {files: files??[], mutateFiles}
}
