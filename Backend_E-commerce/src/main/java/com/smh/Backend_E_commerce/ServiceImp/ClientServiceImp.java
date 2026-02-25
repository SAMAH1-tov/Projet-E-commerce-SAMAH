package com.smh.Backend_E_commerce.ServiceImp;


import com.smh.Backend_E_commerce.Repositories.ClientRepository;
import com.smh.Backend_E_commerce.Services.ClientService;
import com.smh.Backend_E_commerce.entities.Client;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ClientServiceImp implements ClientService {

    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;

    public ClientServiceImp(ClientRepository clientRepository, PasswordEncoder passwordEncoder) {
        this.clientRepository = clientRepository;
        this.passwordEncoder = passwordEncoder;
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
        clientFind.setUsername(client.getRealUsername());
        clientFind.setOrder(client.getOrder());
        clientFind.setLocalization(client.getLocalization());
        if (clientFind.getPassword() != null && !clientFind.getPassword().isEmpty()) {
            clientFind.setPassword(passwordEncoder.encode(clientFind.getPassword()));
        }
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

    public String findName(long id) {
        Client clientFind = clientRepository.findById(id).orElse(null);
        return clientFind.getRealUsername();
    }
}
