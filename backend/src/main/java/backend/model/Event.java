package backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String guestEmail;

    @Column(length = 1000)
    private String notes;

    private String meetingUrl;

    public Event() {}

    public Event(String title, LocalDateTime startTime, LocalDateTime endTime, String guestEmail, String notes, String meetingUrl) {
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.guestEmail = guestEmail;
        this.notes = notes;
        this.meetingUrl = meetingUrl;
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public LocalDateTime getStartTime() { return startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public String getGuestEmail() { return guestEmail; }
    public String getNotes() { return notes; }
    public String getMeetingUrl() { return meetingUrl; }

    public void setTitle(String title) { this.title = title; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public void setGuestEmail(String guestEmail) { this.guestEmail = guestEmail; }
    public void setNotes(String notes) { this.notes = notes; }
    public void setMeetingUrl(String meetingUrl) { this.meetingUrl = meetingUrl; }
}