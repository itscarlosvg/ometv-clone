package backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.model.Event;

public interface EventRepository extends JpaRepository<Event, String> {
    @Override
    Optional<Event> findById(String id);
}