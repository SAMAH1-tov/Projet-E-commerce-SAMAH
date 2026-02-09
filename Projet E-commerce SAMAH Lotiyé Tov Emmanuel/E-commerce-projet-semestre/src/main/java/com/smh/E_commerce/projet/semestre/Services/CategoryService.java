package com.smh.E_commerce.projet.semestre.Services;

import com.smh.E_commerce.projet.semestre.Entities.Category;

import java.util.List;

public interface CategoryService {
    Category save (Category category);

    Category update(Category category, long id);

    List<Category> findAll();

    void delete(long id);

    Category findById(long id);
    
}
