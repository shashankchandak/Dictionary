package com.jd.model;

import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

//Model class for the dictionary which will consist of words
@Entity
public class Words {
	
	@Id
	@Column(name="wid")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int wid;
	@Column(name="word")
	private String word;
	@Column(name="description")
	private String description;
	
	/*There can be multiple urls and it becomes a multivalued attribute but according to
	 normalization of design we should have it in separate table hence making use of element
	 collection this will make a new table and reference words table with foreign key 
	*/
	@ElementCollection
	@CollectionTable(name="imageurls",joinColumns=@JoinColumn(name="wid"))
	@Column(name="url")
	private List<String> urls;
	
	public Words() {
		super();
	}

	public Words(int wid, String word, String description, List<String> urls) {
		super();
		this.wid = wid;
		this.word = word;
		this.description = description;
		this.urls = urls;
	}

	public int getWid() {
		return wid;
	}

	public void setWid(int wid) {
		this.wid = wid;
	}

	public String getWord() {
		return word;
	}

	public void setWord(String word) {
		this.word = word;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getUrls() {
		return urls;
	}

	public void setUrls(List<String> urls) {
		this.urls = urls;
	}

	@Override
	public String toString() {
		return "Words [wid=" + wid + ", word=" + word + ", description=" + description + ", urls=" + urls + "]";
	}

	
	
	
	
}
