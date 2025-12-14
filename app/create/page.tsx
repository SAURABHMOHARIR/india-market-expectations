"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { createUserEvent } from "@/lib/firestore";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { Event } from "@/lib/types";

const CATEGORIES: Event['category'][] = ["Macro", "BFSI", "Energy", "IT", "PSU", "Geopolitics", "Sports", "Social"];

export default function CreateEventPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        question: "",
        category: "Macro" as Event['category'],
        probabilityYes: 50,
        timeHorizon: "",
        rationale: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            await createUserEvent(
                user.uid,
                user.displayName || "Anonymous",
                formData
            );
            router.push("/");
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Failed to create event. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Markets
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Create Market Event</h1>
                    <p className="text-muted-foreground">
                        Submit a new prediction market question for the Indian market.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-card border rounded-xl p-6">
                    <div>
                        <label htmlFor="question" className="block text-sm font-medium mb-2">
                            Event Question *
                        </label>
                        <input
                            id="question"
                            type="text"
                            required
                            placeholder="Will NIFTY 50 cross 25,000 by end of quarter?"
                            value={formData.question}
                            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                            className="w-full px-4 py-2 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium mb-2">
                                Category *
                            </label>
                            <select
                                id="category"
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as Event['category'] })}
                                className="w-full px-4 py-2 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="timeHorizon" className="block text-sm font-medium mb-2">
                                Time Horizon *
                            </label>
                            <input
                                id="timeHorizon"
                                type="text"
                                required
                                placeholder="End of Quarter, Next 30 Days, etc."
                                value={formData.timeHorizon}
                                onChange={(e) => setFormData({ ...formData, timeHorizon: e.target.value })}
                                className="w-full px-4 py-2 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="probability" className="block text-sm font-medium mb-2">
                            Initial Probability (Yes): {formData.probabilityYes}%
                        </label>
                        <input
                            id="probability"
                            type="range"
                            min="1"
                            max="99"
                            value={formData.probabilityYes}
                            onChange={(e) => setFormData({ ...formData, probabilityYes: parseInt(e.target.value) })}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>1%</span>
                            <span>50%</span>
                            <span>99%</span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="rationale" className="block text-sm font-medium mb-2">
                            Rationale / Explanation *
                        </label>
                        <textarea
                            id="rationale"
                            required
                            rows={4}
                            placeholder="Explain the reasoning behind this event and probability..."
                            value={formData.rationale}
                            onChange={(e) => setFormData({ ...formData, rationale: e.target.value })}
                            className="w-full px-4 py-2 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Create Event
                                </>
                            )}
                        </button>
                        <Link
                            href="/"
                            className="px-6 py-3 border rounded-lg hover:bg-muted/50 transition-colors font-medium text-center"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </ProtectedRoute>
    );
}
