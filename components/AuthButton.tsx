"use client";

import { useAuth } from "@/lib/AuthContext";
import { LogIn, LogOut, User as UserIcon, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export function AuthButton() {
    const { user, loading, signInWithGoogle, signOut } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (loading) {
        return <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />;
    }

    if (!user) {
        return (
            <button
                onClick={signInWithGoogle}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In with Google</span>
                <span className="sm:hidden">Sign In</span>
            </button>
        );
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted/50 transition-colors"
            >
                {user.photoURL ? (
                    <Image
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-primary" />
                    </div>
                )}
                <span className="hidden md:inline text-sm font-medium max-w-[120px] truncate">
                    {user.displayName}
                </span>
            </button>

            {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-card border rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium">{user.displayName}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <Link
                        href="/create"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted/50 transition-colors"
                        onClick={() => setShowMenu(false)}
                    >
                        <Plus className="h-4 w-4" />
                        Create Event
                    </Link>
                    <button
                        onClick={() => {
                            signOut();
                            setShowMenu(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-destructive hover:bg-muted/50 transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}
