package com.bolsadeideas.springboot.backen.apirest.model.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bolsadeideas.springboot.backen.apirest.model.entity.Cliente;
import com.bolsadeideas.springboot.backen.apirest.model.entity.Region;

public interface IClienteService {
		public List<Cliente> findAll();
		
		public Page<Cliente> findAll(Pageable pageable);
		
		public Cliente findById(Long id);
			
		public Cliente save(Cliente cliente);
		
		public void delete(Long id);
		
		public List<Region> findAllRegiones();
		
}
