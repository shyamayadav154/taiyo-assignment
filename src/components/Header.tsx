import { Bars3Icon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { useLocation } from "react-router-dom";
import { isSidebarOpenAtom } from "../lib/util";

function Header() {
    const location = useLocation();
    const [_, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);

    return (
        <header className="flex border bg-white  p-2 rounded">
            <button onClick={() => setIsSidebarOpen(true)} className="sm:hidden">
                <Bars3Icon className="w-6 h-6" />
            </button>
            <div className="flex-1 flex justify-center text-2xl font-medium">
                {location.pathname === "/contacts" && "Contact Page"}
                {location.pathname === "/charts-and-maps" && "Chart and Maps"}
            </div>
        </header>
    );
}

export default Header;
