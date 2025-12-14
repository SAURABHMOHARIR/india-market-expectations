import {
    collection,
    addDoc,
    query,
    getDocs,
    orderBy,
    serverTimestamp,
    where
} from 'firebase/firestore';
import { db } from './firebase';
import { Event } from './types';

export interface UserEvent {
    id: string;
    userId: string;
    userName: string;
    question: string;
    category: Event['category'];
    probabilityYes: number;
    timeHorizon: string;
    rationale: string;
    createdAt: any;
}

export async function createUserEvent(
    userId: string,
    userName: string,
    eventData: Omit<UserEvent, 'id' | 'userId' | 'userName' | 'createdAt'>
) {
    try {
        const docRef = await addDoc(collection(db, 'events'), {
            userId,
            userName,
            ...eventData,
            createdAt: serverTimestamp(),
            volume: 'Low', // Default volume for new events
            drivers: [],
            signals: [],
            lastUpdated: new Date().toISOString(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
}

export async function getUserEvents(): Promise<Event[]> {
    try {
        const q = query(
            collection(db, 'events'),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                question: data.question,
                category: data.category,
                probabilityYes: data.probabilityYes,
                timeHorizon: data.timeHorizon,
                drivers: data.drivers || [],
                rationale: data.rationale,
                lastUpdated: data.lastUpdated || new Date().toISOString(),
                signals: data.signals || [],
                volume: data.volume || 'Low',
            };
        });
    } catch (error) {
        console.error('Error fetching user events:', error);
        return [];
    }
}
