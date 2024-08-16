package com.artistry.artistry.repository;

import com.artistry.artistry.model.ArtStore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArtStoreRepository extends JpaRepository<ArtStore, Long> {
    List<ArtStore> findByCityAndDistrict(String city, String district);
}
