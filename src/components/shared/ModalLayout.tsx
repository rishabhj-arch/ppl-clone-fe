import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, ReactNode } from "react";
import { cn } from "./helpers";

interface ModalLayoutProps {
    isOpen: boolean;
    children: ReactNode;
    overflow?: string;
    isPreventOutsideClick?: boolean;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
    isOpen,
    children,
    overflow,
    isPreventOutsideClick = false
}) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="z-70 relative"
                    onClose={() => {
                        if (isPreventOutsideClick) return;
                    }}
                >
                    <div className={cn("fixed inset-0 w-full bg-black/30")} aria-hidden="true" />
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className={cn("fixed inset-0 w-full bg-black bg-opacity-25")} />
                    </Transition.Child>

                    <div className={cn("fixed inset-0 w-full overflow-y-auto")}>
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    style={{
                                        overflow: overflow ? overflow : ""
                                    }}
                                    className="w-fit transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all"
                                >
                                    {children}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ModalLayout;