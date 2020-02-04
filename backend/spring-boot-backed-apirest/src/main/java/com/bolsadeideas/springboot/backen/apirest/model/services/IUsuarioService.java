package com.bolsadeideas.springboot.backen.apirest.model.services;

import com.bolsadeideas.springboot.backen.apirest.model.entity.Usuario;

public interface IUsuarioService {
	public Usuario findByUsername(String username);
}		
