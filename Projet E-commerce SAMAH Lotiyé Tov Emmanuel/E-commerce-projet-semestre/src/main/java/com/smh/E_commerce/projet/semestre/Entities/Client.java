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
@DiscriminatorValue("CLIENT")


public class Client extends Account {

    @Column(name = "localization")
    private String localization;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Order> order;

}
