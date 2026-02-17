package com.smh.Backend_E_commerce.Services;

import com.smh.Backend_E_commerce.Config.JwtService;
import com.smh.Backend_E_commerce.Repositories.AccountRepository;
import com.smh.Backend_E_commerce.dto.AuthenticationRequest;
import com.smh.Backend_E_commerce.dto.AuthenticationResponse;
import com.smh.Backend_E_commerce.dto.RegisterRequest;
import com.smh.Backend_E_commerce.entities.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AccountRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        Account user;
        Role role = request.getRole() != null ? request.getRole() : Role.USER;

        switch (role) {
            case CLIENT:
                Client client = new Client();
                client.setLocalization(request.getLocalization());
                user = client;
                break;
            case DRIVER:
                Driver driver = new Driver();
                driver.setAdresse(request.getAdresse());
                user = driver;
                break;
            case PROVIDER:
                Provider provider = new Provider();
                provider.setCompany(request.getCompany());
                user = provider;
                break;
            default:
                user = new Account();
                break;
        }

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
