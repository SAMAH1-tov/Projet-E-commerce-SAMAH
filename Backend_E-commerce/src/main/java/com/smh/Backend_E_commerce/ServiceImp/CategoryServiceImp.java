package com.smh.Backend_E_commerce.ServiceImp;



import com.smh.Backend_E_commerce.Repositories.CategoryRepository;
import com.smh.Backend_E_commerce.Services.CategoryService;
import com.smh.Backend_E_commerce.entities.Category;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CategoryServiceImp implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImp(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    @Override
    public Category save(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Category update(Category category, long id) {
        Category categoryFind = categoryRepository.findById(id).orElse(null);
        categoryFind.setId(category.getId());
        categoryFind.setName(category.getName());
        categoryFind.setDescription(category.getDescription());
        categoryFind.setSubCategory(category.getSubCategory());
        Category update = categoryRepository.save(categoryFind);
        return update;
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public void delete(long id) {
        Category categoryFind = categoryRepository.findById(id).orElse(null);
        categoryRepository.deleteById(categoryFind.getId());

    }

    @Override
    public Category findById(long id) {
        Category categoryFind = categoryRepository.findById(id).orElse(null);
        return categoryFind;
    }
}
