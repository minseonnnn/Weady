package com.sist.web.entity;

import org.springframework.data.elasticsearch.annotations.Document;

import jakarta.persistence.Id;
import lombok.Data;

@Document(indexName = "weadyboard")
@Data
public class WeadyBoard {
  @Id 
  private int id;
  private int hit;
  private String userid,name,subject,content,regdate;
}
