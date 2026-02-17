package com.smh.Backend_E_commerce.ServiceImp;



import com.smh.Backend_E_commerce.Repositories.GalleryRepository;
import com.smh.Backend_E_commerce.Services.GalleryService;
import com.smh.Backend_E_commerce.entities.Gallery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service

public class GalleryServiceImp implements GalleryService {

    @Autowired
    private final GalleryRepository galleryRepository;

    public GalleryServiceImp(GalleryRepository galleryRepository) {
        this.galleryRepository = galleryRepository;
    }


    private final String uploadDir = "uploads/";


    @Override
    public Gallery save(Gallery gallery) {
        return this.galleryRepository.save(gallery);
    }

    @Override
    public Gallery update(Gallery gallery, long id) {
        Gallery galleryFind = galleryRepository.findById(id).orElse(null);
        galleryFind.setId(gallery.getId());
        galleryFind.setUrl_photo(gallery.getUrl_photo());
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

    @Override
    public String uploadImage(long id, MultipartFile file) {
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);
            Files.copy(file.getInputStream(), path);

            Gallery gallery = galleryRepository.findById(id).orElseThrow();
            gallery.setUrl_photo("/uploads/" + fileName);
            galleryRepository.save(gallery);

            return gallery.getUrl_photo();
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'upload de l'image", e);
        }
    }

}
