export type CalendarEvent = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  guestEmail: string;
  notes?: string;
  meetingUrl?: string;
};