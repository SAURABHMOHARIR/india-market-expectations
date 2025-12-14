import { Signal } from "./types";

/**
 * Probability Engine
 * 
 * This module implements a deterministic, explainable model for calculating
 * event probabilities based on weighted signals. 
 * 
 * It avoids "black box" logic by clearly attributing probability shifts 
 * to specific signal categories (News, Market Data, Fundamentals).
 */

const WEIGHTS = {
    "News Sentiment": 0.4,
    "Market Prices": 0.3,
    "Fundamental Data": 0.3
};

interface ProbabilityResult {
    score: number;
    confidence: number;
    primaryDriver: string;
}

export function calculateProbability(
    baseProbability: number,
    signals: Signal[]
): ProbabilityResult {
    let score = baseProbability;
    let totalImpact = 0;
    let validSignalCount = 0;

    signals.forEach(signal => {
        let impact = 0;

        // Normalize sentiment to shift
        if (signal.sentiment === "bullish") impact = 5; // +5% probability
        if (signal.sentiment === "bearish") impact = -5; // -5% probability

        // Apply weighting based on source (heuristic match)
        let weight = 0.2; // default
        if (signal.source.includes("News")) weight = WEIGHTS["News Sentiment"];
        if (signal.source.includes("Price") || signal.source.includes("Yield") || signal.source.includes("Curve")) weight = WEIGHTS["Market Prices"];
        if (signal.source.includes("CPI") || signal.source.includes("GDP") || signal.source.includes("Earnings")) weight = WEIGHTS["Fundamental Data"];

        totalImpact += (impact * weight);
        validSignalCount++;
    });

    // Apply shifts
    score += totalImpact;

    // Clamp 1-99
    score = Math.max(1, Math.min(99, Math.round(score)));

    // Determine primary driver
    const sortedSignals = [...signals].sort((a, b) => {
        // rough sorting by "importance" (mock)
        return b.source.length - a.source.length;
    });

    const primaryDriver = sortedSignals.length > 0
        ? `${sortedSignals[0].source} (${sortedSignals[0].value})`
        : "Historical Baseline";

    return {
        score,
        confidence: validSignalCount > 3 ? 0.8 : 0.5, // Simple confidence metric
        primaryDriver
    };
}
