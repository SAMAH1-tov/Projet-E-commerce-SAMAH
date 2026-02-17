package com.smh.Backend_E_commerce.Services;



import com.smh.Backend_E_commerce.entities.SubCategory;

import java.util.List;

public interface SubCategoryService {
    SubCategory save (SubCategory subCategory);

    SubCategory update(SubCategory subCategory, long id);

    List<SubCategory> findAll();

    void delete(long id);

    SubCategory findById(long id);
    
}
