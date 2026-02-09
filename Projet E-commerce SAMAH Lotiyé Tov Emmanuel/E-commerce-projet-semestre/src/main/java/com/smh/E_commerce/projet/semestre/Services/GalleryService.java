package com.smh.E_commerce.projet.semestre.Services;

import com.smh.E_commerce.projet.semestre.Entities.Gallery;

import java.util.List;

public interface GalleryService {
    Gallery save (Gallery gallery);

    Gallery update(Gallery gallery, long id);

    List<Gallery> findAll();

    void delete(long id);

    Gallery findById(long id);
    
}
