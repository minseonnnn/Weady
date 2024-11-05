package com.sist.web.restcontroller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.sist.web.entity.*;
import com.sist.web.dao.*;

@RestController
@CrossOrigin(origins = "*")
public class ClothRestController {
	@Autowired
	private ClothDAO cDao;

	@Autowired
	private ItemDAO iDao;

	@GetMapping("cloth/main_react")
	public ResponseEntity<Map> clothRandomData() {
		Map map = new HashMap();
		try
		{
			List<ClothVO> cList = cDao.clothRandom();
			map.put("cList", cList);
			System.out.println(map);
		  }catch(Exception ex)
		  {
			  return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		  }
		  return new ResponseEntity<>(map,HttpStatus.OK);
	}

	@GetMapping("item/find/{page}/{fd}")
	public ResponseEntity<Map> item_find(@PathVariable("page") int page, @PathVariable("fd") String fd) {
		Map map = new HashMap();
		try
    	{
			if(fd.equals("*"))
				fd="";
			int rowSize=31;
			int start=(page-1)*rowSize;
			List<ItemVO> list = iDao.itemFindData(start, fd, fd);
    		int totalpage=iDao.itemFindTotalPage(fd, fd);
    		final int BLOCK=10;
    		int startPage=((page-1)/BLOCK*BLOCK)+1;
    		int endPage=((page-1)/BLOCK*BLOCK)+BLOCK;
            if(endPage>totalpage)
            	endPage=totalpage;
            
            map.put("list", list);
            map.put("curpage", page);
            map.put("totalpage", totalpage);
            map.put("startPage", startPage);
            map.put("endPage", endPage);
    	}catch(Exception ex)
    	{
    		return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);	
    	}
    	return new ResponseEntity<>(map,HttpStatus.OK);
		
	}

	@GetMapping("item/detail/{ino}")
	public ResponseEntity<Map> item_detail(@PathVariable("ino") int ino) {
		Map map = new HashMap();
		try {
			ItemEntity vo = iDao.findByino(ino);
			List<ClothVO> list = iDao.ItemCodiData(ino);
			vo.setHit(vo.getHit() + 1);
			iDao.save(vo);
			vo = iDao.findByino(ino);

			map.put("list", list);
			map.put("vo", vo);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("cloth/detail/{cno}")
	public ResponseEntity<Map> cloth_detail(@PathVariable("cno") int cno) {
		Map map=new HashMap();
		try {
			ClothEntity vo = cDao.findBycno(cno);
			List<ItemVO> list = cDao.CodiItemData(cno);
			vo.setHit(vo.getHit() + 1);
			cDao.save(vo);
			vo = cDao.findBycno(cno);
			map.put("vo", vo);
			map.put("list", list);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	@GetMapping("cloth/season/{season}")
	public ResponseEntity<Map> season_list(@PathVariable("season") String season) {
		Map map = new HashMap();
		try
		{
			List<ClothVO> list = cDao.SeasonBestListData(season); 
			map.put("list", list);
	        map.put("season", season); 
		}catch(Exception ex)
    	{
    		return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    	return new ResponseEntity<>(map,HttpStatus.OK);
	}
	
	@GetMapping("cloth/list/{page}/{tag}")
	public ResponseEntity<Map> cloth_list(@PathVariable("page") int page,@PathVariable("tag") String tag) 
	{
		if(tag.equals("ALL"))
			tag="";
		Map map = new HashMap();
		try {
			int rowSize=32;
			int start=(rowSize*page)-rowSize;
    		List<ClothVO> cList;
    	    if (tag == null || tag.isEmpty()) {
    	    	cList = cDao.CodiTagListData(start, "");
    	    } else {
    	    	cList = cDao.CodiTagListData(start, tag);
    	    }
    	    int totalpage=cDao.CodiTagTotalPage(tag);
    		final int BLOCK=10;
    		int startPage=((page-1)/BLOCK*BLOCK)+1;
    		int endPage=((page-1)/BLOCK*BLOCK)+BLOCK;
            if(endPage>totalpage)
            	endPage=totalpage;
            
            map.put("cList", cList);
            map.put("curpage", page);
            map.put("totalpage", totalpage);
            map.put("startPage", startPage);
            map.put("endPage", endPage);
            map.put("tag", tag);
		}catch(Exception ex)
    	{
    		return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    
    	}
    	return new ResponseEntity<>(map,HttpStatus.OK);
	}

}
