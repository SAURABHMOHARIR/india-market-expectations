import { MOCK_EVENTS } from "@/lib/mockData";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    AlertCircle,
    Clock,
    BarChart3
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { VotingButtons } from "@/components/VotingButtons";


export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = MOCK_EVENTS.find(e => e.id === id);

    if (!event) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Markets
            </Link>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
                <div className="flex-1">
                    <div className="flex gap-2 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary border border-primary/20 bg-primary/5 px-2 py-0.5 rounded">
                            {event.category}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground flex items-center border px-2 py-0.5 rounded">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.timeHorizon}
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
                        {event.question}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Volume: {event.volume}</span>
                        <span>Updated: {new Date(event.lastUpdated).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Voting Card */}
                <div className="w-full md:w-80">
                    <VotingButtons
                        eventId={event.id}
                        initialProbability={event.probabilityYes}
                    />
                </div>
            </div>

            {/* AI Analysis Section */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {/* Rationale */}
                    <section className="bg-muted/30 border rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />
                        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            Market Rationale
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {event.rationale}
                        </p>
                    </section>

                    {/* Drivers */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Top Drivers</h2>
                        <div className="grid gap-4">
                            {event.drivers.map(driver => (
                                <div key={driver.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                                    <div className={cn(
                                        "mt-1 p-1 rounded-full",
                                        driver.impact === "positive" ? "bg-bullish/10 text-bullish" :
                                            driver.impact === "negative" ? "bg-bearish/10 text-bearish" : "bg-muted text-muted-foreground"
                                    )}>
                                        {driver.impact === "positive" ? <TrendingUp className="h-4 w-4" /> :
                                            driver.impact === "negative" ? <TrendingDown className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm">{driver.name}</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{driver.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Signals Table */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Signal Data</h2>
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50 text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Source</th>
                                        <th className="px-4 py-3 font-medium">Value</th>
                                        <th className="px-4 py-3 font-medium">Sentiment</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {event.signals.length > 0 ? event.signals.map((signal, idx) => (
                                        <tr key={idx} className="bg-card hover:bg-muted/20">
                                            <td className="px-4 py-3 font-medium">{signal.source}</td>
                                            <td className="px-4 py-3 text-muted-foreground">{signal.value}</td>
                                            <td className="px-4 py-3">
                                                <span className={cn(
                                                    "px-2 py-1 rounded text-xs font-semibold",
                                                    signal.sentiment === "bullish" ? "bg-bullish/10 text-bullish" :
                                                        signal.sentiment === "bearish" ? "bg-bearish/10 text-bearish" : "bg-muted text-muted-foreground"
                                                )}>
                                                    {signal.sentiment.toUpperCase()}
                                                </span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                                                No signal details available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {/* Side Panel (Context/Rules) */}
                <div className="space-y-6">
                    <div className="border rounded-xl p-5 bg-muted/10">
                        <h3 className="font-semibold text-sm mb-3">Resolution Rules</h3>
                        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                            <li>Market resolves based on official announcements from relevant bodies (RBI, NSE, etc).</li>
                            <li>Consensus estimates used for 'Expectation' queries.</li>
                            <li>Resolution source: Bloomberg, Reuters, or Official Press Release.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
