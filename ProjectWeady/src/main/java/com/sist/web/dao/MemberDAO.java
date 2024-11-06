package com.sist.web.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sist.web.entity.ReactMemberEntity;

@Repository
public interface MemberDAO extends JpaRepository<ReactMemberEntity,String>{
    // 아이디 중복확인
	@Query(value="SELECT COUNT(*) FROM weadyMember "
    		    +"WHERE id=:id",nativeQuery = true)
    public int idCount(@Param("id") String id);
    // 비밀번호 중복확인
	@Query(value="SELECT COUNT(*) FROM weadyMember "
		        +"WHERE pwd=:pwd",nativeQuery = true)
    public int pwdCount(@Param("pwd") String pwd);
	// 비밀번호 중복확인
	@Query(value="SELECT COUNT(*) FROM weadyMember "
			    +"WHERE nickname=:nickname",nativeQuery = true)
	public int nicknameCount(@Param("nickname") String nickname);
	
    // 회원가입
    public ReactMemberEntity save(ReactMemberEntity member);
}