import { SunIcon, BookOpenIcon, BookmarkIcon } from "lucide-react";
import Link from "next/link";

export default function NavigationAdmin() {
    const classLink = "flex items-center gap-2 p-2 border-b-2 border-inherit";
    return (
        <div className="h-full w-1/5 border-r-2 border-inherit">
            <Link className={classLink} href="/admin/category">
                <BookmarkIcon className="w-5 h-5" />
                <span>Category</span>
            </Link>
            <Link className={classLink} href="/admin/blog">
                <BookOpenIcon className="w-5 h-5" />
                <span>Blog</span>
            </Link>
        </div>
    );
};