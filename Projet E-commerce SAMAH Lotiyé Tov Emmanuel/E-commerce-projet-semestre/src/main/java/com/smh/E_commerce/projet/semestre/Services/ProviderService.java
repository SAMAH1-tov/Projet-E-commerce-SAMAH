package com.smh.E_commerce.projet.semestre.Services;

import com.smh.E_commerce.projet.semestre.Entities.Provider;

import java.util.List;

public interface ProviderService {
    Provider save (Provider provider);

    Provider update(Provider provider, long id);

    List<Provider> findAll();

    void delete(long id);

    Provider findById(long id);
    
}
