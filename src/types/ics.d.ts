declare module "ics" {
  export interface EventAttributes {
    start: number[];
    duration?: { hours?: number; minutes?: number };
    title?: string;
    description?: string;
    location?: string;
    url?: string;
    geo?: { lat: number; lon: number };
    categories?: string[];
    status?: string;
    organizer?: { name: string; email: string };
    attendees?: { name: string; email: string; rsvp?: boolean }[];
    alarms?: { action: string; trigger: { minutes: number; before: boolean } }[];
  }

  export function createEvent(
    attributes: EventAttributes
  ): { error?: Error; value?: string };
}