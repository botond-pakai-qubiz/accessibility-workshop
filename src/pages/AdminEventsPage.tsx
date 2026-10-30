import { useState } from "react";
import type { EventItem, NewEventInput } from "@/types";
import { getEvents, addEvent } from "@/lib/repositories/eventRepository";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/features/events/EventCard";
import { AddEventModal } from "@/features/admin/AddEventModal";

export function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>(() => getEvents());
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreate = (input: NewEventInput) => {
    addEvent(input);
    setEvents(getEvents());
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-semibold text-slate-800">
            All events
          </div>
          <p className="text-sm text-slate-500">
            {events.length} events in the platform.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>Add event</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <AddEventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
