import React from "react";

interface ModalProps {
    isOpen: boolean,
    children: React.ReactNode,
    onClick?: () => void,
    title?: string
}

export default function Modal({children, isOpen, onClick, title}: ModalProps) {
    return (
        <div className={`${!isOpen && "hidden"} fixed w-full h-full left-0 top-0 z-10 bg-black bg-opacity-40 overflow-y-auto`}>
            <div className="mt-20 mx-auto bg-white w-3/4 rounded-md border-gray-600 shadow-md">
                <div className="flex justify-between px-3 py-1 border-b border-gray-300 text-xl">
                    <div>{title}</div>
                    <div className="cursor-pointer" onClick={onClick}>x</div>
                </div>
                {children}
            </div>
        </div>
    )
}
