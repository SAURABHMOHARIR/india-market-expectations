"use client";

import { cn } from "@/lib/utils";
import {
    Globe,
    TrendingUp,
    Zap,
    Monitor,
    Building2,
    Landmark,
    Trophy,
    Users
} from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const CATEGORIES = [
    { name: "Macro", icon: Globe },
    { name: "BFSI", icon: Landmark },
    { name: "Energy", icon: Zap },
    { name: "IT", icon: Monitor },
    { name: "PSU", icon: Building2 },
    { name: "Geopolitics", icon: TrendingUp },
    { name: "Sports", icon: Trophy },
    { name: "Social", icon: Users },
];

export function Sidebar() {
    const searchParams = useSearchParams();
    const replace = useRouter().replace;
    const pathname = usePathname();

    const currentCategory = searchParams.get("category");
    const currentTime = searchParams.get("time");

    function handleFilter(key: string, value: string) {
        const params = new URLSearchParams(searchParams);
        if (value === currentCategory || value === currentTime) {
            params.delete(key); // toggle off
        } else {
            params.set(key, value);
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <aside className="hidden lg:block w-64 border-r h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4 scrollbar-thin">
            <div className="space-y-6">
                <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                        Markets
                    </h3>
                    <div className="space-y-1">
                        {CATEGORIES.map((cat) => {
                            const isActive = currentCategory === cat.name;
                            return (
                                <button
                                    key={cat.name}
                                    onClick={() => handleFilter("category", cat.name)}
                                    className={cn(
                                        "flex items-center gap-3 w-full px-2 py-2 text-sm font-medium rounded-md transition-colors",
                                        isActive
                                            ? "bg-secondary text-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    <cat.icon className={cn("h-4 w-4", isActive ? "text-primary" : "")} />
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                        Time Horizon
                    </h3>
                    <div className="space-y-1">
                        {["Next 24 Hours", "This Week", "This Month", "Next Quarter", "Long Term"].map((time) => {
                            const isActive = currentTime === time;
                            return (
                                <button
                                    key={time}
                                    onClick={() => handleFilter("time", time)}
                                    className={cn(
                                        "flex items-center gap-3 w-full px-2 py-2 text-sm font-medium rounded-md transition-colors",
                                        isActive
                                            ? "bg-secondary text-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    )}
                                >
                                    {time}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </aside>
    );
}
