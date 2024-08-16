// Collaboration Service
package com.artistry.artistry.service;

import com.artistry.artistry.model.Collaboration;
import com.artistry.artistry.repository.CollaborationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollaborationService {

    private final CollaborationRepository collaborationRepository;

    public CollaborationService(CollaborationRepository collaborationRepository) {
        this.collaborationRepository = collaborationRepository;
    }

    public List<Collaboration> getCollaborationsByUser(Long userId) {
        return collaborationRepository.findByUserId(userId);
    }

    public Collaboration createCollaboration(Collaboration collaboration) {
        return collaborationRepository.save(collaboration);
    }
}
