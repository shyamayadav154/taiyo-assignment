import { atom } from "jotai";

    
export const isSidebarOpenAtom = atom(false);

export const formatNumber = (value: number) =>
    new Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
    }).format(value);

