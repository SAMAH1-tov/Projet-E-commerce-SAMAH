package com.smh.E_commerce.projet.semestre.Controllers;


import com.smh.E_commerce.projet.semestre.Entities.Provider;
import com.smh.E_commerce.projet.semestre.Services.ProviderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/providers/")

public class ProviderController {
    private final ProviderService providerService;

    public ProviderController(ProviderService providerService) {
        this.providerService = providerService;
    }

    @PostMapping("save")
    public ResponseEntity<Provider> create(@RequestBody Provider provider) {
        Provider saved = providerService.save(provider);
        System.out.println("Provider");
        System.out.println(provider);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("findAll")
    public List<Provider> list() {
        return providerService.findAll();
    }


    @PutMapping("update/{id}")
    public  ResponseEntity<Provider> update(@PathVariable ("id") long id,
                                         @RequestBody Provider provider)
    {
        Provider update = providerService.update(provider,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(update);

    }
    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable ("id") long id){
        providerService.delete(id);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity getById(@PathVariable ("id") long id){
        Provider providerFind = providerService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(providerFind);
    }
}
