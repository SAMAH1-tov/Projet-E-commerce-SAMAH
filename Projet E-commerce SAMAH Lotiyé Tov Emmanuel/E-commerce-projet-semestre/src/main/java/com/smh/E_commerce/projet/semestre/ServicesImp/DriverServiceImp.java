package com.smh.E_commerce.projet.semestre.ServicesImp;


import com.smh.E_commerce.projet.semestre.Entities.Driver;
import com.smh.E_commerce.projet.semestre.Repositories.DriverRepository;
import com.smh.E_commerce.projet.semestre.Services.DriverService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DriverServiceImp implements DriverService {

    private final DriverRepository driverRepository;

    public DriverServiceImp(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }


    @Override
    public Driver save(Driver driver) {
        return this.driverRepository.save(driver);
    }

    @Override
    public Driver update(Driver driver, long id) {
        Driver driverFind = driverRepository.findById(id).orElse(null);
        driverFind.setId(driver.getId());
        driverFind.setFirstName(driver.getFirstName());
        driverFind.setLastName(driver.getLastName());
        driverFind.setPhone(driver.getPhone());
        driverFind.setEmail(driver.getEmail());
        driverFind.setPassword(driver.getPassword());
        driverFind.setUsername(driver.getUsername());
        driverFind.setAdresse(driver.getAdresse());
        driverFind.setOrder(driver.getOrder());
        Driver update = driverRepository.save(driverFind);
        return update;
    }

    @Override
    public List<Driver> findAll() {
        return driverRepository.findAll();
    }

    @Override
    public void delete(long id) {
        Driver driverFind = driverRepository.findById(id).orElse(null);
        driverRepository.deleteById(driverFind.getId());

    }

    @Override
    public Driver findById(long id) {
        Driver driverFind = driverRepository.findById(id).orElse(null);
        return driverFind;
    }
}
