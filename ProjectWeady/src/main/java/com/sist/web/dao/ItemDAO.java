package com.sist.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.*;
import com.sist.web.entity.*;
@Repository
public interface ItemDAO extends JpaRepository<ItemEntity, Integer>{
	
	public ItemEntity findByino(int ino);
	// 아이템 리스트
	@Query(value="SELECT ino,photo,name,brandname,price,hit,likecount "
			    +"FROM item ORDER BY ino ASC "
			    +"LIMIT :start,32",nativeQuery = true)
	public List<ItemVO> itemListData(@Param("start") int start);
    // 아이템 검색
	@Query(value ="SELECT ino,photo,name,brandname,price,hit,likecount "
	        +"FROM item WHERE name LIKE CONCAT('%',:name,'%') "
			+"OR brandname LIKE CONCAT('%',:brandname,'%') ORDER BY ino ASC "
	        +"LIMIT :start,31",nativeQuery = true)
    public List<ItemVO> itemFindData(@Param("start") int start,@Param("name") String name,@Param("brandname") String brandname);

	
    @Query(value ="SELECT CEIL(COUNT(*)/31.0) "
	             +"FROM item "
	             +"WHERE name LIKE CONCAT('%',:name,'%') "
	             +"OR brandname LIKE CONCAT('%',:brandname,'%')")
    public int itemFindTotalPage(@Param("name") String name,@Param("brandname") String brandname);
    
    @Query(value = "SELECT * FROM cloth WHERE cno in (SELECT cno FROM clothitem WHERE ino=:ino)",nativeQuery = true)
    public List<ClothVO> ItemCodiData(@Param("ino") int ino);
        
    
}
