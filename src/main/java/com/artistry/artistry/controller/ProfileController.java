package com.artistry.artistry.controller;

import com.artistry.artistry.model.AppUser;
import com.artistry.artistry.model.InterestCategory;
import com.artistry.artistry.service.AppUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final AppUserService userService;

    public ProfileController(AppUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/interests")
    public ResponseEntity<Set<InterestCategory>> getUserInterests(Principal principal) {
        AppUser user = userService.findByUsername(principal.getName()).orElseThrow();
        return ResponseEntity.ok(user.getInterests());
    }

    @PostMapping("/interests")
    public ResponseEntity<Void> addUserInterest(Principal principal, @RequestParam InterestCategory interest) {
        AppUser user = userService.findByUsername(principal.getName()).orElseThrow();
        userService.addInterestToUser(user.getId(), interest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/interests")
    public ResponseEntity<Void> removeUserInterest(Principal principal, @RequestParam InterestCategory interest) {
        AppUser user = userService.findByUsername(principal.getName()).orElseThrow();
        userService.removeInterestFromUser(user.getId(), interest);
        return ResponseEntity.ok().build();
    }
}
