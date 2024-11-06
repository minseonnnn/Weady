package com.sist.web.restcontroller;
import com.sist.web.entity.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sist.web.dao.*;
import java.util.*;
@RestController
@CrossOrigin(origins = "*")

public class MemberRestController {
   @Autowired
   private MemberDAO mDao;
   @GetMapping("/member/login/{id}/{pwd}")
   public ResponseEntity<Map> memberLogin(@PathVariable("id") String id,
		   @PathVariable("pwd") String pwd)
   {
	     Map map=new HashMap();
	     try
	     {
	    	 int count=mDao.idCount(id);
	    	 if(count==0) 
	    	 {
	    		 map.put("msg", "NOID");
	    	 }
	    	 else 
	    	 {
	    		 ReactMemberEntity vo=mDao.findById(id).get();
	    		 if(vo.getPwd().equals(pwd))
	    		 {
	    			 map.put("msg", "OK");
	    			 map.put("name", vo.getNickname());
	    			 map.put("id", vo.getId());
	    		 }
	    		 else 
	    		 {
	    			 map.put("msg", "NOPWD");
	    		 }
	    	 }
	     }catch(Exception ex)
	     {
	    	 return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
	     }
	     return new ResponseEntity<>(map,HttpStatus.OK);
   }
   
   @PostMapping("/member/signup")
   public ResponseEntity<Map> memberSignup(@RequestBody ReactMemberEntity e)
   {
	     Map map=new HashMap();
	     try
	     {
	    	 int countId=mDao.idCount(e.getId());
	    	 if(countId>0) 
	    	 {
	    		 map.put("msg", "NOID");
	    	 }
	    	 else 
	    	 {
	    		 System.out.println(e.getNickname());
	    		 int countNick=mDao.nicknameCount(e.getNickname());
	    		 if(countNick>0)
	    		 {
	    			 map.put("msg", "NONICK");
	    		 }
	    		 else
	    		 {
	    			 ReactMemberEntity join=new ReactMemberEntity();
	    			 join.setId(e.getId());
	    			 join.setPwd(e.getPwd());
	    			 join.setNickname(e.getNickname());
	    			 mDao.save(join);
	    			 
	    			 map.put("msg", "OK");
	    			 map.put("id", e.getId());
	    			 map.put("nickname", e.getNickname());
	    		 }
	    		 
	    	 }
	     }catch(Exception ex)
	     {
	    	 return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
	     }
	     return new ResponseEntity<>(map,HttpStatus.OK);
   }
}