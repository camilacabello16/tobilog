"use client"

import NavigationAdmin from "../components/navigationAdmin";

export default function AdminPage({ children }: any) {
    return (
        <div className="flex h-full">
            <NavigationAdmin />
            <div className="flex-1 p-2">{children}</div>
        </div>
    );
}