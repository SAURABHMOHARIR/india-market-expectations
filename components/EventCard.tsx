import Link from "next/link";
import { Event } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrendingUp, MessageSquare, Clock } from "lucide-react";

interface EventCardProps {
    event: Event;
}

export function EventCard({ event }: EventCardProps) {
    return (
        <Link href={`/events/${event.id}`} className="group block h-full">
            <div className="border rounded-lg hover:border-muted-foreground/40 bg-card transition-all flex flex-col h-full hover:shadow-sm">
                <div className="p-4 flex-1">
                    {/* Header tags */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase border px-1.5 py-0.5 rounded">
                            {event.category}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.timeHorizon}
                        </span>
                    </div>

                    {/* Question */}
                    <h3 className="font-medium text-base leading-snug mb-4 group-hover:text-primary transition-colors line-clamp-2">
                        {event.question}
                    </h3>

                    {/* Rationale Snippet */}
                    <div className="mb-4">
                        <div className="bg-muted/30 p-2.5 rounded text-xs text-muted-foreground line-clamp-3 italic relative">
                            <span className="opacity-50 not-italic mr-1">🤖</span>
                            {event.rationale}
                        </div>
                    </div>
                </div>

                {/* Probability Bar */}
                <div className="px-4 pb-4 mt-auto">
                    <div className="flex items-center justify-between text-sm font-medium mb-1.5">
                        <span className="text-bullish">Yes {event.probabilityYes}%</span>
                        <span className="text-bearish">No {100 - event.probabilityYes}%</span>
                    </div>
                    <div className="h-2 w-full bg-bearish/20 rounded-full overflow-hidden flex">
                        <div
                            className="h-full bg-bullish transition-all duration-500 ease-out"
                            style={{ width: `${event.probabilityYes}%` }}
                        />
                        {/* The rest is implicitly the background color (bearish/20) or we can make the bg neutral and have two bars. 
                Polymarket typically has a single bar color for the 'Yes' price or split. 
                Let's stick to Yes% fill.
            */}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="font-mono">{event.volume} Vol</span>
                        <span className="flex items-center gap-1 hover:text-foreground">
                            <MessageSquare className="h-3 w-3" />
                            Wait for Drivers
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
