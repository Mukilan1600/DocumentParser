import {useEffect} from 'react'
import useSWR from 'swr'


export default function useFiles() {
    const {data, mutate: mutateFiles} = useSWR("http://localhost:8000/api/file/getfiles")
    const files = data?.files;
    return {files: files??[], mutateFiles}
}
