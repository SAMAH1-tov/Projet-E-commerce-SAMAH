package com.smh.E_commerce.projet.semestre.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ref")
    private String ref;

    @Column(name = "description")
    private String description;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "price")
    private double price;

    @ManyToOne
    @JoinColumn(name="gallery_id")
    private Gallery gallery;

    @ManyToOne
    @JoinColumn(name="provider_id")
    private Provider provider;

    @ManyToOne(optional = true)
    @JoinColumn(name="order_id",nullable = true)
    private Order order;

    @ManyToOne
    @JoinColumn(name="subcategory_id")
    private SubCategory subcategory;

}
