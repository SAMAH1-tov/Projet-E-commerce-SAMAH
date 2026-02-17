package com.smh.Backend_E_commerce.Services;



import com.smh.Backend_E_commerce.entities.Provider;

import java.util.List;

public interface ProviderService {
    Provider save (Provider provider);

    Provider update(Provider provider, long id);

    List<Provider> findAll();

    void delete(long id);

    Provider findById(long id);
    
}
