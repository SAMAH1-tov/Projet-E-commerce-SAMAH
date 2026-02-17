package com.smh.Backend_E_commerce.Repositories;


import com.smh.Backend_E_commerce.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}