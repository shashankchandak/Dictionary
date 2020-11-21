package com.jd.controller;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jd.model.Words;
import com.jd.service.WordService;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class WordController {
	
	@Autowired
	private WordService service;
	
	
	 @GetMapping("/")
	    public String home() {
	        return ("<h1>Welcome</h1>");
	    }
	
	 //Display Words functionality can be accessed by both user and admin
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	@GetMapping(path = "/words")
	public List<Words> getAllWords(){
		return service.getAllWords();
	}
	
	//Only Admin users can add new words
	@PreAuthorize("hasRole('ADMIN')")	
	@PostMapping(path = "/words")
	public Words addWord(@RequestBody Words word) { 
		return service.addWord(word);
	}
	
	@PreAuthorize("hasRole('ADMIN')")	
	@PostMapping(path = "/wordsedit")
	public Words editWord(@RequestBody Words word) { 
		return service.editWord(word);
	}
	
	
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	@GetMapping(path="/words/{word}")
	public Words searchWord(@PathVariable String word) {
		return service.searchWord(word);
	}
	
	@PreAuthorize("hasRole('ADMIN')")	
	@DeleteMapping(path = "/words/{id}")
	public void deleteWord(@PathVariable int id) { 
		service.deleteWordById(id);
	}

}
