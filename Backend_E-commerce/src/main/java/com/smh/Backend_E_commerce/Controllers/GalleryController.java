package com.smh.Backend_E_commerce.Controllers;


import com.smh.Backend_E_commerce.Services.GalleryService;
import com.smh.Backend_E_commerce.entities.Gallery;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/galleries/")

public class GalleryController {
    private final GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @PostMapping("save")
    public ResponseEntity<Gallery> create(@RequestBody Gallery gallery) {
        Gallery saved = galleryService.save(gallery);
        System.out.println("Gallery");
        System.out.println(gallery);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("findAll")
    public List<Gallery> list() {
        return galleryService.findAll();
    }


    @PutMapping("update/{id}")
    public  ResponseEntity<Gallery> update(@PathVariable ("id") long id,
                                         @RequestBody Gallery gallery)
    {
        Gallery update = galleryService.update(gallery,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(update);

    }
    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable ("id") long id){
        galleryService.delete(id);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity getById(@PathVariable ("id") long id){
        Gallery galleryFind = galleryService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(galleryFind);
    }
    @PostMapping("/{id}/upload")
    public ResponseEntity<String> uploadImage(@PathVariable long id, @RequestParam("file") MultipartFile file) {
        String url = galleryService.uploadImage(id, file);
        return ResponseEntity.ok(url);
    }


}
