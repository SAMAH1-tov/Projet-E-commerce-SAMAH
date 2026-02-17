package com.smh.Backend_E_commerce.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("PROVIDER")


public class Provider extends Account {

    @Column(name = "company")
    private String company;

    @OneToMany(mappedBy = "provider", cascade = CascadeType.ALL)
    private List<Product> products;

}
