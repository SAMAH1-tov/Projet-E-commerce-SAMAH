package com.smh.Backend_E_commerce.Repositories;


import com.smh.Backend_E_commerce.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

}