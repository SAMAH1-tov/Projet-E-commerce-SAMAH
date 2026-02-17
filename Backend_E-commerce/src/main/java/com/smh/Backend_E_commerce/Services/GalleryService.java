package com.smh.Backend_E_commerce.Services;

import com.smh.Backend_E_commerce.entities.Gallery;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GalleryService {
    Gallery save (Gallery gallery);

    Gallery update(Gallery gallery, long id);

    List<Gallery> findAll();

    void delete(long id);

    Gallery findById(long id);

    String uploadImage(long id, MultipartFile file);
}
