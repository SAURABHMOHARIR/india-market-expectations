import { Sidebar } from "@/components/Sidebar";
import { EventCard } from "@/components/EventCard";
import { MOCK_EVENTS } from "@/lib/mockData";
import { getUserEvents } from "@/lib/firestore";
import { Suspense } from "react";
import { Event } from "@/lib/types";

export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const query = params.q?.toLowerCase() || "";
  const category = params.category;

  // Fetch user-created events from Firestore
  let userEvents: Event[] = [];
  try {
    userEvents = await getUserEvents();
  } catch (error) {
    console.error("Error fetching user events:", error);
  }

  // Merge mock events and user events
  const allEvents = [...userEvents, ...MOCK_EVENTS];

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.question.toLowerCase().includes(query) ||
      event.category.toLowerCase().includes(query) ||
      event.rationale.toLowerCase().includes(query);

    const matchesCategory = category ? event.category === category : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 gap-8">
      <Suspense fallback={<div className="w-64 border-r h-screen bg-muted/10 animate-pulse" />}>
        <Sidebar />
      </Suspense>

      <main className="flex-1 pb-12 min-w-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Market Expectations</h1>
          <p className="text-muted-foreground text-lg">
            Quantifying uncertainty for India's most critical market events.
          </p>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No events found matching your criteria.</p>
            <button className="mt-4 text-primary hover:underline">Clear Filters</button>
          </div>
        )}
      </main>
    </div>
  );
}
