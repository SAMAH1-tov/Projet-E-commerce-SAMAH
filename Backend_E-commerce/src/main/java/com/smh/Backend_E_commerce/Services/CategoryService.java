package com.smh.Backend_E_commerce.Services;

import com.smh.Backend_E_commerce.entities.Category;

import java.util.List;

public interface CategoryService {
    Category save (Category category);

    Category update(Category category, long id);

    List<Category> findAll();

    void delete(long id);

    Category findById(long id);
    
}
