package com.sist.web.restcontroller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	public Map clothRandomData() {
		Map map = new HashMap();
		List<ClothVO> cList = cDao.clothRandom();
		map.put("cList", cList);

		return map;
	}

	/*@GetMapping("cloth/list_react")
	public Map cloth_list(int page) {
		Map map = new HashMap();
		int start = (page * 32) - 32;
		List<ClothVO> list = cDao.clothListData(start);
		int count = (int) cDao.count();
		int totalpage = (int) (Math.ceil(count / 32.0));
		final int BLOCK = 10;
		int startPage = ((page - 1) / BLOCK * BLOCK) + 1;
		int endPage = ((page - 1) / BLOCK * BLOCK) + BLOCK;
		if (endPage > totalpage)
			endPage = totalpage;

		map.put("list", list);
		map.put("curpage", page);
		map.put("totalpage", totalpage);
		map.put("startPage", startPage);
		map.put("endPage", endPage);

		return map;
	}*/

	@GetMapping("item/find_react")
	public Map item_find(int page, String name, String brandname) {
		Map map = new HashMap();
		int start = (page * 31) - 31;
		List<ItemVO> list = iDao.itemFindData(start, name, brandname);
		int totalpage = iDao.itemFindTotalPage(name, brandname);
		final int BLOCK = 10;
		int startPage = ((page - 1) / BLOCK * BLOCK) + 1;
		int endPage = ((page - 1) / BLOCK * BLOCK) + BLOCK;
		if (endPage > totalpage)
			endPage = totalpage;

		map.put("list", list);
		map.put("curpage", page);
		map.put("totalpage", totalpage);
		map.put("startPage", startPage);
		map.put("endPage", endPage);
		map.put("name", name);
		map.put("brandname", brandname);

		return map;
	}

	@GetMapping("item/detail_react")
	public Map item_detail(int ino) {
		Map map = new HashMap();
		List<ClothVO> list = iDao.ItemCodiData(ino);
		
		ItemEntity vo = iDao.findByino(ino);
		vo.setHit(vo.getHit() + 1);
		iDao.save(vo);
		vo = iDao.findByino(ino);
		
		map.put("list", list);
		map.put("vo", vo);
		return map;
	}
	
	@GetMapping("cloth/detail_react")
	public Map cloth_detail(int cno) {
		Map map = new HashMap();
		List<ItemVO> list = cDao.CodiItemData(cno);

		ClothEntity vo = cDao.findBycno(cno);
		vo.setHit(vo.getHit() + 1);
		cDao.save(vo);
		vo = cDao.findBycno(cno);

		map.put("list", list);
		map.put("vo", vo);
		return map;
	}
	
	@GetMapping("cloth/season_best")
	public Map season_list(String season) {
		Map map = new HashMap();
	    List<ClothVO> list = cDao.SeasonBestListData(season); 
	    map.put("list", list);
	    map.put("season", season); 

	    return map; 
	}
	
	@GetMapping("cloth/list_react")
	public Map cloth_list(int page,String tag) {
		Map map = new HashMap();
		int start = (page * 32) - 32;
		List<ClothVO> list;
	    if (tag == null || tag.isEmpty()) {
	        list = cDao.CodiTagListData(start, "");
	    } else {
	        list = cDao.CodiTagListData(start, tag);
	    }
	    
	    int totalpage=cDao.CodiTagTotalPage(tag);
		
		final int BLOCK = 10;
		int startPage = ((page - 1) / BLOCK * BLOCK) + 1;
		int endPage = ((page - 1) / BLOCK * BLOCK) + BLOCK;
		if (endPage > totalpage)
			endPage = totalpage;

		map.put("list", list);
		map.put("curpage", page);
		map.put("totalpage", totalpage);
		map.put("startPage", startPage);
		map.put("endPage", endPage);
	    map.put("tag", tag); 

	    return map; 
	}


}
