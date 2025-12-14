"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { submitVote, getUserVote, getVoteCounts, calculateProbabilityFromVotes, type Vote, type VoteCounts } from '@/lib/voting';
import { TrendingUp, TrendingDown, Users } from 'lucide-react';

interface VotingButtonsProps {
    eventId: string;
    initialProbability: number;
}

export function VotingButtons({ eventId, initialProbability }: VotingButtonsProps) {
    const { user } = useAuth();
    const [userVote, setUserVote] = useState<Vote | null>(null);
    const [votes, setVotes] = useState<VoteCounts>({ yes: 0, no: 0, total: 0 });
    const [loading, setLoading] = useState(false);
    const [probability, setProbability] = useState(initialProbability);

    useEffect(() => {
        loadVoteData();
    }, [eventId, user]);

    async function loadVoteData() {
        try {
            // Get vote counts
            const voteCounts = await getVoteCounts(eventId);
            setVotes(voteCounts);

            // Calculate probability from votes if there are any
            if (voteCounts.total > 0) {
                setProbability(calculateProbabilityFromVotes(voteCounts));
            }

            // Get user's vote if logged in
            if (user) {
                const vote = await getUserVote(eventId, user.uid);
                setUserVote(vote);
            }
        } catch (error) {
            console.error('Error loading vote data:', error);
        }
    }

    async function handleVote(vote: Vote) {
        if (!user) {
            alert('Please sign in to vote');
            return;
        }

        setLoading(true);
        try {
            await submitVote(eventId, user.uid, vote);
            setUserVote(vote);
            await loadVoteData(); // Reload to get updated counts
        } catch (error) {
            console.error('Error submitting vote:', error);
            alert('Failed to submit vote');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            {/* Probability Display */}
            <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                    <div className="text-5xl font-bold text-bullish">{probability}%</div>
                    <div className="text-sm text-muted-foreground mt-1">YES</div>
                </div>
                <div className="text-center flex-1">
                    <div className="text-5xl font-bold text-bearish">{100 - probability}%</div>
                    <div className="text-sm text-muted-foreground mt-1">NO</div>
                </div>
            </div>

            {/* Probability Bar */}
            <div className="relative h-3 bg-bearish/20 rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-bullish rounded-full transition-all duration-500"
                    style={{ width: `${probability}%` }}
                />
            </div>

            {/* Voting Buttons */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => handleVote('yes')}
                    disabled={loading}
                    className={`
            flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold
            transition-all duration-200 
            ${userVote === 'yes'
                            ? 'bg-bullish text-white ring-2 ring-bullish'
                            : 'bg-bullish/10 text-bullish hover:bg-bullish/20'
                        }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
                >
                    <TrendingUp className="h-5 w-5" />
                    <span>Trade Yes</span>
                </button>

                <button
                    onClick={() => handleVote('no')}
                    disabled={loading}
                    className={`
            flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold
            transition-all duration-200
            ${userVote === 'no'
                            ? 'bg-bearish text-white ring-2 ring-bearish'
                            : 'bg-bearish/10 text-bearish hover:bg-bearish/20'
                        }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
                >
                    <TrendingDown className="h-5 w-5" />
                    <span>Trade No</span>
                </button>
            </div>

            {/* Vote Stats */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{votes.total} {votes.total === 1 ? 'vote' : 'votes'} cast</span>
            </div>

            {!user && (
                <p className="text-center text-xs text-muted-foreground">
                    Mock trading only. No real money.
                </p>
            )}
        </div>
    );
}
