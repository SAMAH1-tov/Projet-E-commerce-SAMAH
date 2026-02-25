package com.smh.Backend_E_commerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String username; // <-- AJOUTÉ
    private String email;    // <-- AJOUTÉ (souvent utile aussi)
    private String role;     // <-- AJOUTÉ (souvent utile aussi)
}
