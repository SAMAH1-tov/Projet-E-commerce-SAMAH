package com.smh.Backend_E_commerce.ServiceImp;


import com.smh.Backend_E_commerce.Repositories.ProviderRepository;
import com.smh.Backend_E_commerce.Services.ProviderService;

import com.smh.Backend_E_commerce.entities.Provider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProviderServiceImp implements ProviderService {

    private final ProviderRepository providerRepository;
    private final PasswordEncoder passwordEncoder;

    public ProviderServiceImp(ProviderRepository providerRepository, PasswordEncoder passwordEncoder) {
        this.providerRepository = providerRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public Provider save(Provider provider) {
        return this.providerRepository.save(provider);
    }

    @Override
    public Provider update(Provider provider, long id) {
        Provider providerFind = providerRepository.findById(id).orElse(null);
        providerFind.setId(provider.getId());
        providerFind.setFirstName(provider.getFirstName());
        providerFind.setLastName(provider.getLastName());
        providerFind.setPhone(provider.getPhone());
        providerFind.setEmail(provider.getEmail());
        providerFind.setUsername(provider.getUsername());
        providerFind.setCompany(provider.getCompany());
        providerFind.setProducts(provider.getProducts());
        if (providerFind.getPassword() != null && !providerFind.getPassword().isEmpty()) {
            providerFind.setPassword(passwordEncoder.encode(providerFind.getPassword()));
        }
        Provider update = providerRepository.save(providerFind);
        return update;
    }

    @Override
    public List<Provider> findAll() {
        return providerRepository.findAll();
    }

    @Override
    public void delete(long id) {
        Provider providerFind = providerRepository.findById(id).orElse(null);
        providerRepository.deleteById(providerFind.getId());

    }

    @Override
    public Provider findById(long id) {
        Provider providerFind = providerRepository.findById(id).orElse(null);
        return providerFind;
    }
}
