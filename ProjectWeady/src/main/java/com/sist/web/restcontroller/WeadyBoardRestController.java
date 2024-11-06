package com.sist.web.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sist.web.dao.WeadyBoardRepository;
import com.sist.web.entity.*;

import java.text.SimpleDateFormat;
import java.util.*;
@RestController  // => 다른 언어와 연결 : javascript(ajax,vue,react)
                 // => 모바일 (kotlin , flutter)
                 // => python
                 // => 호환성 : xml => json
                 // => 자동으로 JSON출력
                 // => Rest API => GET(데이터를 읽기 : SELECT)
                 // POST (데이터 추가) / PUT(데이터 수정) / DELETE(데이터 삭제)
@CrossOrigin(origins = "*")
public class WeadyBoardRestController {
   @Autowired
   private WeadyBoardRepository bDao;

   @GetMapping("board/list_react")
   public Map board_list(int page){
	   int rowSize=10;
	   Pageable pg=PageRequest.of(page-1, rowSize,Sort.by(Sort.Direction.DESC,"id"));
	   
	   Page<WeadyBoard> pList=bDao.findAll(pg);
	   List<WeadyBoard> list=new ArrayList<WeadyBoard>();
	   if(pList!=null && pList.hasContent()) 
	   {
		   list=pList.getContent(); 
	   }
	   
	   int count=(int)bDao.count();
	   int totalpage=(int)(Math.ceil(count/10.0));
	   Map map=new HashMap();
	   map.put("list", list);
	   map.put("curpage", page);
	   map.put("totalpage", totalpage);
	   map.put("today", new SimpleDateFormat("yyy-MM-dd").format(new Date()));
	   return map;
	   
   }
   @PostMapping("board/insert_react")
   public String board_insert(WeadyBoard vo)
   {
	   String result="";
	   try
	   {
		   vo.setHit(0);
		   vo.setId(idMaxData());
		   vo.setRegdate(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
		   
		   bDao.save(vo);
		   
		   result="yes";
	   }catch(Exception ex)
	   {
		   result=ex.getMessage();
	   }
	   return result;
   }
   // 시퀀스
   public int idMaxData() {
	   int max=0;
	   try
	   {
	   int rowSize=10;
	   int start=0; 
	   Pageable pg=PageRequest.of(start, rowSize,Sort.by(Sort.Direction.DESC,"id"));
	 
	   Page<WeadyBoard> pList=bDao.findAll(pg);
	   List<WeadyBoard> list=new ArrayList<WeadyBoard>();
	   if(pList!=null && pList.hasContent()) 
	   {
		   list=pList.getContent(); 
		   max=list.get(0).getId();
	   }
	   }catch(Exception ex)
	   {
		   max=0;
	   }
	   return max+1;
   }
   // 상세보기
   @GetMapping("board/detail_react")
   public WeadyBoard board_detail(int id)
   {
	   WeadyBoard vo=bDao.findById(id).get();
	   vo.setHit(vo.getHit()+1);
	   bDao.save(vo);
	  
	   vo=bDao.findById(id).get();
	   return vo;
   }
   @GetMapping("eboard/update_react")
   public WeadyBoard board_update(int id)
   {
	   WeadyBoard vo=bDao.findById(id).get();
	   return vo;
   }
   @PostMapping("board/update_ok_react")
   public String board_update_ok(WeadyBoard vo)
   {
	   String result="";
	   WeadyBoard dbvo=bDao.findById(vo.getId()).get();
	   /*if(dbvo.getPwd().equals(vo.getPwd()))
	   {
		   vo.setHit(dbvo.getHit());
		   vo.setRegdate(dbvo.getRegdate());
		   bDao.save(vo); // 수정
		   result="yes";
	   }
	   else
	   {
		   result="no";
	   }*/
	   return result;
   }
   @GetMapping("board/delete_ok_react")
   public String board_delete(int id,String pwd)
   {
	   String result="";
	   WeadyBoard vo=bDao.findById(id).get();
	   /*if(vo.getPwd().equals(pwd))
	   {
		   bDao.delete(vo);
		   result="yes";
	   }
	   else
	   {
		   result="no";
	   }*/
	   return result;
   }
}

