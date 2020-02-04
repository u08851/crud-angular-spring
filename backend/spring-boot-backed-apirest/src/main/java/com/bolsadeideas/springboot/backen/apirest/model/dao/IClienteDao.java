package com.bolsadeideas.springboot.backen.apirest.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bolsadeideas.springboot.backen.apirest.model.entity.Cliente;
import com.bolsadeideas.springboot.backen.apirest.model.entity.Region;

public interface IClienteDao extends JpaRepository<Cliente, Long>{
//public interface IClienteDao extends CrudRepository<Cliente, Long>{
	//extends Reutilizacion de codigo (herencia)
	
	@Query("from Region") //la clase Region
	public List<Region> findAllRegiones();
}
