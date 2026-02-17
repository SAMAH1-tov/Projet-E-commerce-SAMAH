package com.smh.Backend_E_commerce.Services;



import com.smh.Backend_E_commerce.entities.Driver;

import java.util.List;

public interface DriverService {
    Driver save (Driver driver);

    Driver update(Driver driver, long id);

    List<Driver> findAll();

    void delete(long id);

    Driver findById(long id);
    
}
