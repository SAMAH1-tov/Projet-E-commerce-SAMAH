package com.smh.Backend_E_commerce.ServiceImp;



import com.smh.Backend_E_commerce.Repositories.DriverRepository;
import com.smh.Backend_E_commerce.Services.DriverService;
import com.smh.Backend_E_commerce.entities.Driver;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DriverServiceImp implements DriverService {

    private final DriverRepository driverRepository;
    private final PasswordEncoder passwordEncoder;

    public DriverServiceImp(DriverRepository driverRepository, PasswordEncoder passwordEncoder) {
        this.driverRepository = driverRepository;
        this.passwordEncoder = passwordEncoder;
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
        driverFind.setUsername(driver.getUsername());
        driverFind.setAdresse(driver.getAdresse());
        driverFind.setOrders(driver.getOrders());
        Driver update = driverRepository.save(driverFind);
        if (driverFind.getPassword() != null && !driverFind.getPassword().isEmpty()) {
            driverFind.setPassword(passwordEncoder.encode(driverFind.getPassword()));
        }
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
