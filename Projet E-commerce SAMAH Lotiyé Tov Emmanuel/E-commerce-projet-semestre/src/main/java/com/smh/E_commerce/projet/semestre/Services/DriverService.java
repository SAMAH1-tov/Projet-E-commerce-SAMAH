package com.smh.E_commerce.projet.semestre.Services;

import com.smh.E_commerce.projet.semestre.Entities.Driver;

import java.util.List;

public interface DriverService {
    Driver save (Driver driver);

    Driver update(Driver driver, long id);

    List<Driver> findAll();

    void delete(long id);

    Driver findById(long id);
    
}
