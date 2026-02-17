package com.smh.Backend_E_commerce.dto;

import com.smh.Backend_E_commerce.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String phone;
    private String password;
    private Role role;
    private String localization;
    private String adresse;
    private String company;
}
