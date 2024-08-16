// Collaboration Controller
package com.artistry.artistry.controller;

import com.artistry.artistry.model.Collaboration;
import com.artistry.artistry.service.CollaborationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collaborations")
public class CollaborationController {

    private final CollaborationService collaborationService;

    public CollaborationController(CollaborationService collaborationService) {
        this.collaborationService = collaborationService;
    }

    @GetMapping("/user/{userId}")
    public List<Collaboration> getCollaborationsByUser(@PathVariable Long userId) {
        return collaborationService.getCollaborationsByUser(userId);
    }

    @PostMapping
    public Collaboration createCollaboration(@RequestBody Collaboration collaboration) {
        return collaborationService.createCollaboration(collaboration);
    }
}
