package com.smh.E_commerce.projet.semestre.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "Gallery")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Gallery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "url_photo")
    private String url_photo;

    @OneToMany(mappedBy = "gallery", cascade = CascadeType.ALL)
    private List<Product> products;

}
