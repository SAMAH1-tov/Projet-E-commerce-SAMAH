package com.smh.E_commerce.projet.semestre.Controllers;


import com.smh.E_commerce.projet.semestre.Entities.Driver;
import com.smh.E_commerce.projet.semestre.Services.DriverService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/drivers/")

public class DriverController {
    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    @PostMapping("save")
    public ResponseEntity<Driver> create(@RequestBody Driver driver) {
        Driver saved = driverService.save(driver);
        System.out.println("Driver");
        System.out.println(driver);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("findAll")
    public List<Driver> list() {
        return driverService.findAll();
    }


    @PutMapping("update/{id}")
    public  ResponseEntity<Driver> update(@PathVariable ("id") long id,
                                         @RequestBody Driver driver)
    {
        Driver update = driverService.update(driver,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(update);

    }
    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable ("id") long id){
        driverService.delete(id);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity getById(@PathVariable ("id") long id){
        Driver driverFind = driverService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(driverFind);
    }
}
