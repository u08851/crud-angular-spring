package com.bolsadeideas.springboot.backen.apirest.model.services;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class IUploadFileServiceImp implements IUploadFileService {
	private final Logger log = LoggerFactory.getLogger(IUploadFileServiceImp.class);
	
	private final static String  DIRECTORIO_UPLOAD = "uploads";

	@Override
	public Resource cargar(String nombreFoto) throws MalformedURLException {
		Path rutaArchivo = getPath(nombreFoto);
		log.info(rutaArchivo.toString());
		Resource recurso =  new UrlResource(rutaArchivo.toUri());
		
		if(!recurso.exists() && !recurso.isReadable()){ // validamos con una imagen de usario vacia
			rutaArchivo = Paths.get("src/main/resources/static/images").resolve("no-usuario.png").toAbsolutePath();
			recurso = new UrlResource(rutaArchivo.toUri());
			log.error("Error no se pudo cargar la imagen: "+nombreFoto);
		}
		
		return recurso;
	}

	@Override
	public String copiar(MultipartFile archivo) throws IOException {
		String nombreArchivo = UUID.randomUUID().toString()+"_"+archivo.getOriginalFilename().replace(" ", "");
		Path rutaArchivo = getPath(nombreArchivo);
		log.info(rutaArchivo.toString());
		Files.copy(archivo.getInputStream(), rutaArchivo);
		return nombreArchivo;
	}	

	@Override
	public boolean eliminar(String nombreFoto) {
		if(nombreFoto != null && nombreFoto.length() > 0) {
			Path rutaArchivoFotoAnterior = Paths.get("uploads").resolve(nombreFoto).toAbsolutePath();
			File archivoArchivoFotoAnterior = rutaArchivoFotoAnterior.toFile();
			
			if(archivoArchivoFotoAnterior.exists() && archivoArchivoFotoAnterior.canRead()) {
				archivoArchivoFotoAnterior.delete();
				return true;
			}
		}
		return false;
	}

	@Override
	public Path getPath(String nombreFoto) {
		
		return Paths.get(DIRECTORIO_UPLOAD).resolve(nombreFoto).toAbsolutePath();
		
	}

}
