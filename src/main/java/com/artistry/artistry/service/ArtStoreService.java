package com.artistry.artistry.service;

import com.artistry.artistry.model.ArtStore;
import com.artistry.artistry.repository.ArtStoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtStoreService {

    private final ArtStoreRepository artStoreRepository;

    public ArtStoreService(ArtStoreRepository artStoreRepository) {
        this.artStoreRepository = artStoreRepository;
    }

    public List<ArtStore> getArtStoresByLocation(String city, String district) {
        return artStoreRepository.findByCityAndDistrict(city, district);
    }

    public ArtStore updateArtStore(Long id, String name, String address, String city, String district,
                                   String latitude, String longitude, String phone, String openingHours, String imageUrl) {
        ArtStore artStore = artStoreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Art Store not found"));
        artStore.setName(name);
        artStore.setAddress(address);
        artStore.setCity(city);
        artStore.setDistrict(district);
        artStore.setLatitude(latitude);
        artStore.setLongitude(longitude);
        artStore.setPhone(phone);
        artStore.setOpeningHours(openingHours);
        artStore.setImageUrl(imageUrl);
        return artStoreRepository.save(artStore);
    }
}
