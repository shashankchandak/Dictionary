package com.jd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jd.model.Words;




//Jpa repository gives implementation of basic crud by methods like save,findById,findAll 
@Repository
public interface WordRepository extends JpaRepository<Words, Integer> {

	 //Custom query to get word id from the word
	 @Query("select wid from Words where word = ?1")
	 public int getWordId(String word);
}
