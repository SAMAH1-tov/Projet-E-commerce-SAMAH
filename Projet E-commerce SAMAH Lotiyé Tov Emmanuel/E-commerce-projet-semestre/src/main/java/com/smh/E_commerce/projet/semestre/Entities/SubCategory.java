package com.smh.E_commerce.projet.semestre.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "SubCategories")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    @OneToMany(mappedBy = "subcategory", cascade = CascadeType.ALL)
    private List<Product> products;
}
