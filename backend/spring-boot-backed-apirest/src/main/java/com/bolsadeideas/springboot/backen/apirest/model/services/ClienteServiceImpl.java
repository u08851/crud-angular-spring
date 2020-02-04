package com.bolsadeideas.springboot.backen.apirest.model.services;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.bolsadeideas.springboot.backen.apirest.model.dao.IClienteDao;
import com.bolsadeideas.springboot.backen.apirest.model.entity.Cliente;
import com.bolsadeideas.springboot.backen.apirest.model.entity.Region;

@Service
public class ClienteServiceImpl implements IClienteService {
	@Autowired // Inyectar el cliente dao (por detras spring crea una instancia d)
	private IClienteDao clienteDao; //instancia de esta interfaz

	@Override
	@Transactional(readOnly = true) // se puede omitir esta anotacion ya viene implementada en el CrudRepository
	public List<Cliente> findAll() {
		return (List<Cliente>) clienteDao.findAll();
	}
	
	@Override
	@Transactional(readOnly = true) 
	public Page<Cliente> findAll(Pageable pageable) {
		return clienteDao.findAll(pageable);
	}
	
	
	@Override
	@Transactional(readOnly = true) 
	public Cliente findById(Long id) {
		// TODO Auto-generated method stub
		return clienteDao.findById(id).orElse(null);
	} 

	@Override
	@Transactional
	public Cliente save(Cliente cliente) {
		// TODO Auto-generated method stub
		return clienteDao.save(cliente);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		 clienteDao.deleteById(id);
		
	}

	@Override
	@Transactional(readOnly = true)
	public List<Region> findAllRegiones() {
		// TODO Auto-generated method stub
		return clienteDao.findAllRegiones();
	}

}
