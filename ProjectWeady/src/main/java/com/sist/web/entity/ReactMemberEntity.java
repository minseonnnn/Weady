package com.sist.web.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity(name="weadymember")
@Data
public class ReactMemberEntity {
  @Id
  private String id;
  private String nickname,pwd;
}
