package com.sist.web.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity(name="cloth")
@Data
public class ClothEntity {
	@Id
	private int cno;
	private int hit,likecount;
	private String season,tag,poster;
}
