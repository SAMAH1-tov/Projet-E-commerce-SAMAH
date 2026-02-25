package com.smh.Backend_E_commerce.ServiceImp;

import com.smh.Backend_E_commerce.Repositories.CategoryRepository;
import com.smh.Backend_E_commerce.Repositories.SubCategoryRepository;
import com.smh.Backend_E_commerce.Services.SubCategoryService;
import com.smh.Backend_E_commerce.entities.Category;
import com.smh.Backend_E_commerce.entities.SubCategory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoryServiceImp implements SubCategoryService {

    private final SubCategoryRepository subCategoryRepository;
    private final CategoryRepository categoryRepository;

    public SubCategoryServiceImp(SubCategoryRepository subCategoryRepository, CategoryRepository categoryRepository) {
        this.subCategoryRepository = subCategoryRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public SubCategory save(SubCategory subCategory) {
        // On récupère la catégorie parente depuis la base de données
        if (subCategory.getCategory() != null && subCategory.getCategory().getId() != null) {
            Category category = categoryRepository.findById(subCategory.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            subCategory.setCategory(category);
        }
        return this.subCategoryRepository.save(subCategory);
    }

    @Override
    public SubCategory update(SubCategory subCategory, long id) {
        SubCategory subCategoryFind = subCategoryRepository.findById(id).orElseThrow(() -> new RuntimeException("SubCategory not found"));
        
        subCategoryFind.setName(subCategory.getName());
        subCategoryFind.setDescription(subCategory.getDescription());
        
        // Mise à jour de la catégorie si nécessaire
        if (subCategory.getCategory() != null && subCategory.getCategory().getId() != null) {
             Category category = categoryRepository.findById(subCategory.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            subCategoryFind.setCategory(category);
        }
        
        // On ne met pas à jour les produits ici généralement, sauf besoin spécifique
        // subCategoryFind.setProducts(subCategory.getProducts());
        
        return subCategoryRepository.save(subCategoryFind);
    }

    @Override
    public List<SubCategory> findAll() {
        return subCategoryRepository.findAll();
    }

    @Override
    public void delete(long id) {
        if (subCategoryRepository.existsById(id)) {
            subCategoryRepository.deleteById(id);
        }
    }

    @Override
    public SubCategory findById(long id) {
        return subCategoryRepository.findById(id).orElse(null);
    }
}
