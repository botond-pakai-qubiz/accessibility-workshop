import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEvents } from "@/hooks/useEvents";
import { useRegistrations } from "@/hooks/useRegistrations";
import { EventCard } from "@/features/events/EventCard";
import { Carousel } from "@/components/ui/Carousel";

export function DashboardPage() {
  const { currentUser } = useAuth();
  const events = useEvents();
  const { registeredIds, unregister } = useRegistrations();
  const navigate = useNavigate();

  const myEvents = useMemo(
    () => events.filter((event) => registeredIds.includes(event.id)),
    [events, registeredIds],
  );

  const upcomingEvents = useMemo(
    () => events.filter((event) => !registeredIds.includes(event.id)),
    [events, registeredIds],
  );

  const openEvent = (eventId: string) => navigate(`/events/${eventId}`);

  return (
    <div className="flex flex-col gap-10">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Hello, {currentUser?.name?.split(" ")[0]}
          </h1>
          <p className="text-sm text-slate-500">
            Here is what is happening with your events.
          </p>
        </div>

        <section aria-label="My events">
          <h2 className="text-lg font-semibold text-slate-800">My events</h2>
        {myEvents.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
            You have not signed up for any events yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {myEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onOpen={openEvent}
                onDismiss={unregister}
                badge="Going"
              />
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Upcoming events
        </h2>
        <Carousel
          items={upcomingEvents}
          perView={4}
          getKey={(event) => event.id}
          renderItem={(event) => <EventCard event={event} onOpen={openEvent} />}
        />
      </section>
    </div>
  );
}
