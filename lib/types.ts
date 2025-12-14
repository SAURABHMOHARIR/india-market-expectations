export interface Driver {
    id: string;
    name: string;
    impact: "positive" | "negative" | "neutral";
    description: string;
}

export interface Signal {
    source: string;
    value: string;
    sentiment: "bullish" | "bearish" | "neutral";
}

export interface Event {
    id: string;
    question: string;
    category: "Macro" | "BFSI" | "Energy" | "IT" | "PSU" | "Geopolitics" | "Sports" | "Social";
    probabilityYes: number; // 0 to 100
    timeHorizon: string;
    drivers: Driver[];
    rationale: string;
    lastUpdated: string;
    signals: Signal[];
    volume: string;
}
