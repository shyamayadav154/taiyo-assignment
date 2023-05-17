import { NavLink } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useAtom } from "jotai";
import clsx from "clsx";
import { isSidebarOpenAtom } from "../lib/util";

function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useAtom(isSidebarOpenAtom);
    const closeSidebar = () => setSidebarOpen(false);
    return (
        <aside className="bg-white">
            <MobileSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <div className=" sticky top-10 px-2 w-52 hidden sm:block">
                <SidbarNav closeSidebar={closeSidebar} />
            </div>
        </aside>
    );
}

type MobileSidebarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
};

const MobileSidebar = ({ sidebarOpen, setSidebarOpen }: MobileSidebarProps) => {
    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50 lg:hidden"
                onClose={setSidebarOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button
                                        type="button"
                                        className="-m-2.5 p-2.5"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </Transition.Child>

                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                                <SidbarNav closeSidebar={() => setSidebarOpen(false)} />
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

const SidbarNav = ({ closeSidebar }: { closeSidebar: () => void }) => {
    return (
        <nav className="flex flex-1 mt-10 flex-col">
            <ul role="list" className="-mx-2 space-y-1 ">
                <li className="">
                    <NavLink
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            clsx("flex px-4 py-2 font-medum rounded", {
                                "bg-gray-100 font-medium": isActive,
                            })}
                        to="/contacts"
                    >
                        Contacts
                    </NavLink>
                </li>
                <li className="">
                    <NavLink
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            clsx("flex px-4 py-2 font-medum rounded", {
                                "bg-gray-100 font-medium": isActive,
                            })}
                        to="/charts-and-maps"
                    >
                        Charts and Maps
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
