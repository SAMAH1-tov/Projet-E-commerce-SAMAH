package com.smh.Backend_E_commerce.Services;

import com.smh.Backend_E_commerce.entities.Client;

import java.util.List;

public interface ClientService {
    Client save (Client client);

    Client update(Client client, long id);

    List<Client> findAll();

    void delete(long id);

    Client findById(long id);
    
}
