package com.smh.E_commerce.projet.semestre.ServicesImp;


import com.smh.E_commerce.projet.semestre.Entities.Provider;
import com.smh.E_commerce.projet.semestre.Repositories.ProviderRepository;
import com.smh.E_commerce.projet.semestre.Services.ProviderService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProviderServiceImp implements ProviderService {

    private final ProviderRepository providerRepository;

    public ProviderServiceImp(ProviderRepository providerRepository) {
        this.providerRepository = providerRepository;
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
        providerFind.setPassword(provider.getPassword());
        providerFind.setUsername(provider.getUsername());
        providerFind.setCompany(provider.getCompany());
        providerFind.setProducts(provider.getProducts());
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
