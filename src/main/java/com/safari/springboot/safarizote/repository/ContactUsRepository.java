package com.safari.springboot.safarizote.repository;


import com.safari.springboot.safarizote.model.ContactUs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ContactUsRepository extends JpaRepository<ContactUs, Long>{

}