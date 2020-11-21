package com.jd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.jd.model.Words;
import com.jd.repository.WordRepository;

@Service
public class WordService {
	
	@Autowired
	private WordRepository wordsDao;
	
	public List<Words> getAllWords(){
		//sorting by word as we want to display words in alphabetical order like in dictionary
		return wordsDao.findAll(Sort.by("word").ascending());

	}
	
	public Words addWord(Words word) {
		return wordsDao.save(word);
	}
	
	public Words editWord(Words word) {
		int wid=wordsDao.getWordId(word.getWord());
		wordsDao.deleteById(wid);
		return wordsDao.save(word);
	}
	public Words searchWord(String word) {
		
		//first finding the wordid from word and then using predefined findById method
	    int wid=wordsDao.getWordId(word);
	    System.out.println(wid);
	    Optional<Words> w=wordsDao.findById(wid);	
		return w.get();
	}
	
	public void deleteWordById(int wid) {
		wordsDao.deleteById(wid);
	}
}
