package com.smh.E_commerce.projet.semestre.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("DRIVER")

public class Driver extends Account {

    @Column(name = "adresse")
    private String adresse;

    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL)
    private List<Order> orders;
}
