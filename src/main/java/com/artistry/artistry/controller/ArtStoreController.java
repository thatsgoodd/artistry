package com.artistry.artistry.controller;

import com.artistry.artistry.model.ArtStore;
import com.artistry.artistry.service.ArtStoreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artstores")
public class ArtStoreController {

    private final ArtStoreService artStoreService;

    public ArtStoreController(ArtStoreService artStoreService) {
        this.artStoreService = artStoreService;
    }

    @GetMapping
    public List<ArtStore> getArtStores(@RequestParam String city, @RequestParam String district) {
        return artStoreService.getArtStoresByLocation(city, district);
    }

    @PutMapping("/{id}")
    public ArtStore updateArtStore(@PathVariable Long id,
                                   @RequestParam String name,
                                   @RequestParam String address,
                                   @RequestParam String city,
                                   @RequestParam String district,
                                   @RequestParam String latitude,
                                   @RequestParam String longitude,
                                   @RequestParam String phone,
                                   @RequestParam String openingHours,
                                   @RequestParam String imageUrl) {
        return artStoreService.updateArtStore(id, name, address, city, district, latitude, longitude, phone, openingHours, imageUrl);
    }
}
