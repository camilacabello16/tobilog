import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { SunIcon } from "lucide-react";
import Link from "next/link";

export default function NavigationMenu() {
    const { userId } = auth();

    return (
        <header className="flex items-center px-4 py-2 border-b bg-white md:px-6 dark:bg-gray-950 justify-between h-12">
            <Link className="flex items-center gap-2 mr-4" href="#">
                <SunIcon className="w-5 h-5 fill-current" />
            </Link>
            <nav className="hidden md:flex items-center space-x-4 flex-1">
                <Link className="font-medium" href="/blog">
                    Blog
                </Link>
                <Link className="font-medium" href="#">
                    Contact
                </Link>
                {userId &&
                    <Link className="font-medium" href="/admin">
                        Admin
                    </Link>
                }
            </nav>
            {userId && <UserButton afterSignOutUrl="/" />}
            {!userId &&
                <div>
                    <Button size="sm" variant="outline" className="mr-1">
                        <Link className="font-medium" href="/sign-in">
                            Sign in
                        </Link>
                    </Button>
                    <Button size="sm" variant="outline">
                        <Link className="font-medium" href="/sign-up">
                            Sign up
                        </Link>
                    </Button>
                </div>
            }
        </header>
    );
}