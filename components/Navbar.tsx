"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { AuthButton } from "./AuthButton";

export function Navbar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <nav className="border-b bg-card sticky top-0 z-50 shadow-sm/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button className="lg:hidden p-2 hover:bg-muted rounded-md">
                        <Menu className="h-5 w-5" />
                    </button>
                    <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
                        <span className="text-2xl filter drop-shadow-sm">🇮🇳</span>
                        <span className="hidden sm:inline">Market Expectations</span>
                        <span className="sm:hidden">IME</span>
                    </Link>
                </div>

                <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search events (e.g. 'RBI', 'NIFTY', 'Election')"
                        className="w-full bg-muted/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/70"
                        onChange={(e) => handleSearch(e.target.value)}
                        defaultValue={searchParams.get("q")?.toString()}
                    />
                </div>

                <AuthButton />
            </div>
        </nav>
    );
}
