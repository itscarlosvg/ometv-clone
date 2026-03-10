package backend.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import backend.model.Event;
import backend.repository.EventRepository;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event createEvent(Event event) {

        // generar enlace automático
        String meetingUrl = "https://videomeet.app/room/" + UUID.randomUUID();

        event.setMeetingUrl(meetingUrl);

        return eventRepository.save(event);
    }
}