import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

export type Vote = 'yes' | 'no';

export interface VoteData {
    vote: Vote;
    timestamp: any;
    userId: string;
}

export interface VoteCounts {
    yes: number;
    no: number;
    total: number;
}

// Submit or update a vote
export async function submitVote(
    eventId: string,
    userId: string,
    vote: Vote
): Promise<void> {
    if (!db) throw new Error('Firestore not initialized');

    const voteRef = doc(db, 'events', eventId, 'votes', userId);

    await setDoc(voteRef, {
        vote,
        userId,
        timestamp: serverTimestamp(),
    });
}

// Get user's vote for an event
export async function getUserVote(
    eventId: string,
    userId: string
): Promise<Vote | null> {
    if (!db) return null;

    const voteRef = doc(db, 'events', eventId, 'votes', userId);
    const voteSnap = await getDoc(voteRef);

    if (voteSnap.exists()) {
        return voteSnap.data().vote as Vote;
    }

    return null;
}

// Get vote counts for an event
export async function getVoteCounts(eventId: string): Promise<VoteCounts> {
    if (!db) return { yes: 0, no: 0, total: 0 };

    const votesRef = collection(db, 'events', eventId, 'votes');
    const votesSnap = await getDocs(query(votesRef));

    let yesCount = 0;
    let noCount = 0;

    votesSnap.forEach((doc) => {
        const data = doc.data();
        if (data.vote === 'yes') yesCount++;
        if (data.vote === 'no') noCount++;
    });

    return {
        yes: yesCount,
        no: noCount,
        total: yesCount + noCount,
    };
}

// Calculate probability based on votes
export function calculateProbabilityFromVotes(votes: VoteCounts): number {
    if (votes.total === 0) return 50; // Default 50/50 if no votes
    return Math.round((votes.yes / votes.total) * 100);
}
