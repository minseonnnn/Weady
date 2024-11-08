package com.sist.web.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sist.web.dao.WeadyBoardRepository;
import com.sist.web.entity.*;

import java.text.SimpleDateFormat;
import java.util.*;
@RestController  

@CrossOrigin(origins = "*")
public class WeadyBoardRestController {
   @Autowired
   private WeadyBoardRepository bDao;

   @GetMapping("board/list/{page}")
   public Map board_list(@PathVariable("page") int page){
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
	   map.put("count", count);
	   map.put("curpage", page);
	   map.put("totalpage", totalpage);
	   map.put("today", new SimpleDateFormat("yyy-MM-dd").format(new Date()));
	   return map;
	   
   }
   @PostMapping("board/insert")
   public void board_insert(@RequestBody WeadyBoard vo)
   {
		   vo.setHit(0);
		   vo.setId(idMaxData());
		   vo.setRegdate(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
		   
		   bDao.save(vo);
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
   @GetMapping("board/detail/{id}")
   public ResponseEntity<WeadyBoard> board_detail(@PathVariable("id") int id)
   {
	   try
	   {
		   WeadyBoard vo=bDao.findById(id).get();
		   vo.setHit(vo.getHit()+1);
		   bDao.save(vo);
		  
		   vo=bDao.findById(id).get();
		   System.out.println(vo);
		   return new ResponseEntity<>(vo,HttpStatus.OK);
	   }catch(Exception ex)
		  {
			  return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		  }
   }
   @GetMapping("board/update/{id}")
   public ResponseEntity<WeadyBoard> board_update(@PathVariable("id") int id)
   {
	   try
	   {
		   WeadyBoard vo=bDao.findById(id).get();   
		   return new ResponseEntity<>(vo,HttpStatus.OK);
	   }catch(Exception ex)
		  {
			  return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		  }
   }
  @DeleteMapping("board/delete/{id}")
   public void board_delete(@PathVariable("id") int id)
   {
		   WeadyBoard vo=bDao.findById(id).get();   
		   bDao.delete(vo);
   }
   @PutMapping("board/update_ok")
   public void board_update_ok(@RequestBody WeadyBoard vo)
   {
	   WeadyBoard dbvo=bDao.findById(vo.getId()).get();
		   vo.setHit(dbvo.getHit());
		   vo.setRegdate(dbvo.getRegdate());
		   vo.setUserid(dbvo.getUserid());
		   vo.setName(dbvo.getName());
		   bDao.save(vo); 
		   
   }
 
}

