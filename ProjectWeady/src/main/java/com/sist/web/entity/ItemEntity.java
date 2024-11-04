package com.sist.web.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity(name="item")
@Data
public class ItemEntity {
	@Id
	private int ino;
	private int price,hit,likecount;
	private String photo,name,brandname;
}
