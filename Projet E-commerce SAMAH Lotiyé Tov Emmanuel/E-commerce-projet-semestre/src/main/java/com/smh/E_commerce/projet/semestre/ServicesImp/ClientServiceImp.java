package com.smh.E_commerce.projet.semestre.ServicesImp;


import com.smh.E_commerce.projet.semestre.Entities.Client;
import com.smh.E_commerce.projet.semestre.Repositories.ClientRepository;
import com.smh.E_commerce.projet.semestre.Services.ClientService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ClientServiceImp implements ClientService {

    private final ClientRepository clientRepository;

    public ClientServiceImp(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }


    @Override
    public Client save(Client client) {
        return this.clientRepository.save(client);
    }

    @Override
    public Client update(Client client, long id) {
        Client clientFind = clientRepository.findById(id).orElse(null);
        clientFind.setId(client.getId());
        clientFind.setFirstName(client.getFirstName());
        clientFind.setLastName(client.getLastName());
        clientFind.setPhone(client.getPhone());
        clientFind.setEmail(client.getEmail());
        clientFind.setPassword(client.getPassword());
        clientFind.setUsername(client.getUsername());
        clientFind.setOrder(client.getOrder());
        clientFind.setLocalization(client.getLocalization());
        Client update = clientRepository.save(clientFind);
        return update;
    }

    @Override
    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    @Override
    public void delete(long id) {
        Client clientFind = clientRepository.findById(id).orElse(null);
        clientRepository.deleteById(clientFind.getId());

    }

    @Override
    public Client findById(long id) {
        Client clientFind = clientRepository.findById(id).orElse(null);
        return clientFind;
    }
}
