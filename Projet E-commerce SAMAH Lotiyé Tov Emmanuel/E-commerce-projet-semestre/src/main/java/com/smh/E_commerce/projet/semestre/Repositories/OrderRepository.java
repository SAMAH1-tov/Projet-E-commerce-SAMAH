package com.smh.E_commerce.projet.semestre.Repositories;

import com.smh.E_commerce.projet.semestre.Entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

}