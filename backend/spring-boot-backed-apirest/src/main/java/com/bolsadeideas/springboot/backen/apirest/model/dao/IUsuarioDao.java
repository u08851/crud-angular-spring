package com.bolsadeideas.springboot.backen.apirest.model.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.bolsadeideas.springboot.backen.apirest.model.entity.Usuario;

public interface IUsuarioDao extends CrudRepository<Usuario, Long> {
	
//	public Usuario findByUsernameAndEmail(String username, String email);
	public Usuario findByUsername(String username);
	
//	@Query("select u from Usuario u where u.username =?1 and u.otro =?2")
	@Query("select u from Usuario u where u.username =?1")
	public Usuario findByUsername2(String username);

	
	
	
	
}
