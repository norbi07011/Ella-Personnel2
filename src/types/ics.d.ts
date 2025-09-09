declare module "ics" {
  export interface EventAttributes {
    start: number[];
    duration?: { hours?: number; minutes?: number };
    title?: string;
    description?: string;
    // ...existing code...
  }
  // ...existing code...
}
