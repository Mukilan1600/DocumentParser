import Link from 'next/link'

export default function Nav() {
    return (
        <div className="py-2 px-3 bg-gray-900 text-white flex flex-row w-full items-center justify-between">
            <div className="font-mono font-bold text-4xl">
                DP
            </div>
            <div>
                <a href="https://github.com/Mukilan1600/DocumentParser" target="_blank">
                    Github
                </a>
            </div>
        </div>
    )
}
