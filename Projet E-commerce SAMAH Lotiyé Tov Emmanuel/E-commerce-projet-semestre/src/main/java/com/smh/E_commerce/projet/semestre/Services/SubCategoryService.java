package com.smh.E_commerce.projet.semestre.Services;

import com.smh.E_commerce.projet.semestre.Entities.SubCategory;

import java.util.List;

public interface SubCategoryService {
    SubCategory save (SubCategory subCategory);

    SubCategory update(SubCategory subCategory, long id);

    List<SubCategory> findAll();

    void delete(long id);

    SubCategory findById(long id);
    
}
