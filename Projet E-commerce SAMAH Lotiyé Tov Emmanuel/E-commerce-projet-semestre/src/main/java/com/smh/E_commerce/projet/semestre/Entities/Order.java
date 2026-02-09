package com.smh.E_commerce.projet.semestre.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ref")
    private String ref;

    @Column(name = "description")
    private String description;

    @Column(name = "quantity_total")
    private int quantity_total;

    @Column(name = "price_total")
    private double price_total;

    @Column(name = "state")
    private boolean state;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<Product> products;

    @ManyToOne
    @JoinColumn(name="client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name="driver_id")
    private Driver driver;

}
