import { Event } from "./types";

export const MOCK_EVENTS: Event[] = [
    {
        id: "1",
        question: "Will RBI cut the repo rate in the next policy meeting?",
        category: "Macro",
        probabilityYes: 32,
        timeHorizon: "Next Policy",
        drivers: [
            { id: "d1", name: "CPI Inflation", impact: "negative", description: "Latest CPI data shows slight uptick above 5% tolerance." },
            { id: "d2", name: "GDP Growth", impact: "positive", description: "Strong GDP growth reduces pressure for immediate cuts." },
        ],
        rationale: "While market liquidity is tightening, persistent food inflation concerns likely compel the MPC to hold rates steady for one more cycle.",
        lastUpdated: "2025-12-14T10:00:00Z",
        signals: [
            { source: "News Sentiment", value: "Hawkish", sentiment: "bearish" },
            { source: "Bond Yields", value: "Rising", sentiment: "bearish" }
        ],
        volume: "High"
    },
    {
        id: "2",
        question: "Will NIFTY 50 cross 24,000 by end of quarter?",
        category: "BFSI",
        probabilityYes: 68,
        timeHorizon: "End of Quarter",
        drivers: [
            { id: "d3", name: "FII Inflows", impact: "positive", description: "Record FII inflows observed in the last 2 weeks." },
            { id: "d4", name: "Corporate Earnings", impact: "positive", description: "Sector leaders beating estimates." },
        ],
        rationale: "Momentum indicators and strong FII participation suggest a high probability of breaking resistance levels before quarter-end.",
        lastUpdated: "2025-12-14T09:30:00Z",
        signals: [
            { source: "Technical", value: "Bullish Divergence", sentiment: "bullish" },
            { source: "Options Data", value: "Call Writing > 24k", sentiment: "neutral" }
        ],
        volume: "High"
    },
    {
        id: "3",
        question: "Will India CPI exceed 6% next quarter?",
        category: "Macro",
        probabilityYes: 45,
        timeHorizon: "Next Quarter",
        drivers: [
            { id: "d5", name: "Monsoon Impact", impact: "negative", description: "Delayed monsoon affecting kharif sowing." },
            { id: "d6", name: "Oil Prices", impact: "neutral", description: "Crude stable at $78." },
        ],
        rationale: "Risk skew is to the upside due to vegetable prices, but base effects may keep the headline number just below the psychological 6% mark.",
        lastUpdated: "2025-12-14T11:00:00Z",
        signals: [
            { source: "Wholesale Prices", value: "Rising", sentiment: "bearish" }
        ],
        volume: "Medium"
    },
    {
        id: "4",
        question: "Will Infosys beat earnings expectations this quarter?",
        category: "IT",
        probabilityYes: 55,
        timeHorizon: "This Quarter",
        drivers: [
            { id: "d7", name: "Deal Wins", impact: "positive", description: "Large deal TCV reported in previous announcements." },
            { id: "d8", name: "US Macro", impact: "negative", description: "Slowdown in discretionary spend in North America." },
        ],
        rationale: "Expectations are already muted, creating a lower bar for a 'beat', despite headwinds in the BFSI vertice.",
        lastUpdated: "2025-12-13T16:00:00Z",
        signals: [
            { source: "Analyst Ratings", value: "Neutral", sentiment: "neutral" }
        ],
        volume: "High"
    },
    {
        id: "5",
        question: "Will Brent crude stay above $80 this month?",
        category: "Energy",
        probabilityYes: 25,
        timeHorizon: "This Month",
        drivers: [
            { id: "d9", name: "OPEC+ Supply", impact: "positive", description: "Production cuts extended." },
            { id: "d10", name: "China Demand", impact: "negative", description: "Weaker than expected industrial data from China." },
        ],
        rationale: "Global demand concerns currently outweigh supply constraints, pushing futures lower.",
        lastUpdated: "2025-12-14T08:00:00Z",
        signals: [
            { source: "Futures Curve", value: "Backwardation", sentiment: "bearish" }
        ],
        volume: "Medium"
    },
    {
        id: "6",
        question: "Will PSU banks outperform NIFTY in next 30 days?",
        category: "PSU",
        probabilityYes: 72,
        timeHorizon: "30 Days",
        drivers: [
            { id: "d11", name: "Valuation Gap", impact: "positive", description: "P/B ratios still attractive vs private peers." },
            { id: "d12", name: "Credit Growth", impact: "positive", description: "Robust loan book expansion reported." },
        ],
        rationale: "Sector rotation favors value stocks, and PSU banks remain the primary beneficiaries of the current capex cycle.",
        lastUpdated: "2025-12-14T12:00:00Z",
        signals: [
            { source: "Delivery Volume", value: "Spike", sentiment: "bullish" }
        ],
        volume: "High"
    },
    {
        id: "7",
        question: "Will Red Sea tensions disrupt Indian shipping routes this month?",
        category: "Geopolitics",
        probabilityYes: 80,
        timeHorizon: "This Month",
        drivers: [
            { id: "d13", name: "Insurance Costs", impact: "negative", description: "War risk premiums for shipping up 20%." },
            { id: "d14", name: "Rerouting", impact: "neutral", description: "Vessels already diverting via Cape of Good Hope." },
        ],
        rationale: "Disruption is already happening; the probability reflects whether it intensifies to a total blockage or severe delay scenario.",
        lastUpdated: "2025-12-14T05:00:00Z",
        signals: [
            { source: "Container Index", value: "Rising", sentiment: "bearish" }
        ],
        volume: "Low"
    },
    {
        id: "8",
        question: "Will major election outcomes materially affect state GDP outlook?",
        category: "Social",
        probabilityYes: 40,
        timeHorizon: "Next 6 Months",
        drivers: [
            { id: "d15", name: "Welfare Spending", impact: "negative", description: "Populist measures may strain fiscal deficit." },
            { id: "d16", name: "Investment Continuity", impact: "positive", description: "Core infrastructure projects likely to continue regardless of outcome." },
        ],
        rationale: "Unless there is a drastic regime change, economic policy continuity is the consensus view for the major states involved.",
        lastUpdated: "2025-12-10T09:00:00Z",
        signals: [
            { source: "Opinion Polls", value: "Mixed", sentiment: "neutral" }
        ],
        volume: "Medium"
    },
    {
        id: "9",
        question: "Will India announce new trade restrictions in next 90 days?",
        category: "Geopolitics",
        probabilityYes: 15,
        timeHorizon: "90 Days",
        drivers: [
            { id: "d17", name: "WTO Pressure", impact: "negative", description: "Recent disputes suggest preference for diplomacy." },
        ],
        rationale: "Government focus is on export promotion (PLI schemes) rather than protectionism at this stage.",
        lastUpdated: "2025-12-14T14:00:00Z",
        signals: [],
        volume: "Low"
    },
    {
        id: "10",
        question: "Will a PSU bank announce capital infusion in next 90 days?",
        category: "PSU",
        probabilityYes: 60,
        timeHorizon: "90 Days",
        drivers: [
            { id: "d18", name: "Basel III Norms", impact: "positive", description: "Need to shore up Tier-1 capital." },
        ],
        rationale: "Several mid-sized PSUs are approaching thresholds where raising capital via QIP seems likely.",
        lastUpdated: "2025-12-14T13:00:00Z",
        signals: [],
        volume: "Medium"
    },
    {
        id: "11",
        question: "Will IPL disruptions affect advertising revenues this season?",
        category: "Sports",
        probabilityYes: 10,
        timeHorizon: "This Season",
        drivers: [
            { id: "d19", name: "Schedule", impact: "positive", description: "Tournament dates finalized without clashes." },
        ],
        rationale: "Advertisers have already locked in slots; inventory is sold out.",
        lastUpdated: "2025-12-14T15:00:00Z",
        signals: [],
        volume: "Low"
    },
    {
        id: "12",
        question: "Will India revise fuel prices this fortnight?",
        category: "Energy",
        probabilityYes: 85,
        timeHorizon: "Fortnight",
        drivers: [
            { id: "d20", name: "OMC Margins", impact: "positive", description: "Margins have recovered significantly." },
            { id: "d21", name: "Election Proximity", impact: "positive", description: "Historical trend of price cuts pre-elections." },
        ],
        rationale: "The combination of recovering marketing margins and political timing makes a price revision highly probable.",
        lastUpdated: "2025-12-14T16:00:00Z",
        signals: [
            { source: "News", value: "Speculation High", sentiment: "bullish" }
        ],
        volume: "High"
    }
];
