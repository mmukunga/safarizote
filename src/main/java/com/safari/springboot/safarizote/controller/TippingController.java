package com.safari.springboot.safarizote.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TippingController {

    @RequestMapping(value="/api/lagKuppong", method=RequestMethod.GET)
    public ResponseEntity<JSONObject> lagKuppong() {
        List<JSONObject> kuppong = new ArrayList<>();
        for (int i = 0; i < 10; i++) { 
            JSONObject  rekke = createRow(i);
            kuppong.add(rekke);
        }
        Map<String, List<JSONObject>> m = new HashMap<>();
        m.put("Maji", kuppong);
        JSONObject tipping = new JSONObject(m);

        return new ResponseEntity<>(tipping, HttpStatus.OK);
    }   
    
    public List<Integer> generateRow() {     
        List<Integer> list = ThreadLocalRandom.current()
            .ints(1, 35)
            .boxed()
            .distinct()
            .limit(7)
            .collect(Collectors.toList());
        return list;             
    }  
    
    public JSONObject createRow(Integer id) {     
        Map<String, List<Integer>> m = new HashMap<>();
        HashMap<String,Object> objMap = new HashMap<String,Object>();
        List<Integer> list = ThreadLocalRandom.current()
            .ints(1, 35)
            .boxed()
            .distinct()
            .limit(7)
            .collect(Collectors.toList());
            list = list.stream().sorted().collect(Collectors.toList());
            for (int i = 0; i < list.size(); i++) {
              String key = String.format("%02d", i);
              objMap.put("c"+key, list.get(i));
            }

            m.put("R", list);

        return new JSONObject(m);             
    }   
}