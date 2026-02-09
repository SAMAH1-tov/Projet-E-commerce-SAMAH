package com.smh.E_commerce.projet.semestre.ServicesImp;


import com.smh.E_commerce.projet.semestre.Entities.Gallery;
import com.smh.E_commerce.projet.semestre.Repositories.GalleryRepository;
import com.smh.E_commerce.projet.semestre.Services.GalleryService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public class GalleryServiceImp implements GalleryService {

    private final GalleryRepository galleryRepository;

    public GalleryServiceImp(GalleryRepository galleryRepository) {
        this.galleryRepository = galleryRepository;
    }


    @Override
    public Gallery save(Gallery gallery) {
        return this.galleryRepository.save(gallery);
    }

    @Override
    public Gallery update(Gallery gallery, long id) {
        Gallery galleryFind = galleryRepository.findById(id).orElse(null);
        galleryFind.setId(gallery.getId());
        galleryFind.setUrl_photo(gallery.getUrl_photo());
        galleryFind.setProducts(gallery.getProducts());
        Gallery update = galleryRepository.save(galleryFind);
        return update;
    }

    @Override
    public List<Gallery> findAll() {
        return galleryRepository.findAll();
    }

    @Override
    public void delete(long id) {
        Gallery galleryFind = galleryRepository.findById(id).orElse(null);
        galleryRepository.deleteById(galleryFind.getId());

    }

    @Override
    public Gallery findById(long id) {
        Gallery galleryFind = galleryRepository.findById(id).orElse(null);
        return galleryFind;
    }
}
