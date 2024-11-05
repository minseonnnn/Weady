package com.sist.web.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.*;
import com.sist.web.entity.*;

@Repository
public interface ClothDAO extends JpaRepository<ClothEntity, Integer> {
	// 랜덤 12개 출력
	@Query(value = "SELECT cno,season,tag,poster,hit,likecount " 
	             + "FROM cloth ORDER BY rand() "
			     + "LIMIT 0,12", nativeQuery = true)
	public List<ClothVO> clothRandom();

	public ClothEntity findBycno(int cno);

	// 코디 리스트
	@Query(value = "SELECT cno,season,tag,poster,hit,likecount " + "FROM cloth ORDER BY cno ASC "
			+ "LIMIT :start,32", nativeQuery = true)
	public List<ClothVO> clothListData(@Param("start") int start);

	// 연관 ITEM 목록 출력
	@Query(value = "SELECT * FROM item WHERE ino in (SELECT ino FROM clothitem WHERE cno=:cno)", nativeQuery = true)
	public List<ItemVO> CodiItemData(@Param("cno") int cno);

	// 계절별 코디 베스트
	@Query(value = "SELECT cno,season,tag,poster,hit,likecount " + "FROM cloth " + "WHERE season=:season "
			     + "ORDER BY hit DESC " + "LIMIT 100", nativeQuery = true)
	public List<ClothVO> SeasonBestListData(@Param("season") String season);

	// 태그별 코디 목록
	@Query(value = "SELECT cno,season,tag,poster,hit,likecount " + "FROM cloth "
			     + "WHERE tag LIKE CONCAT('%', :tag, '%') " + "ORDER BY hit DESC " + "LIMIT :start,32", nativeQuery = true)
	public List<ClothVO> CodiTagListData(@Param("start") int start, @Param("tag") String tag);

	// 태그별 코디 목록 페이징
	@Query(value = "SELECT CEIL(COUNT(*)/32.0) " 
	             + "FROM cloth "
			     + "WHERE tag LIKE CONCAT('%', :tag, '%')", nativeQuery = true)
	public int CodiTagTotalPage(@Param("tag") String tag);

}
