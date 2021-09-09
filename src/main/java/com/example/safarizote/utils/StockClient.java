package com.example.safarizote.utils;

import java.io.InputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;

import java.net.URL;
import java.util.Scanner;

import org.springframework.stereotype.Component;

@Component
public class StockClient {

    public String yahooCurrent(String ticker) throws Exception {
        String QUERYURL = "https://query1.finance.yahoo.com/v8/finance/chart/";
		System.out.println("yahooHistory - SYMBOLS:= " + ticker);
       
        String quoteSite = QUERYURL.concat(ticker).concat("?interval=1h");
        URL yahooFeed = new URL(quoteSite);

        InputStream is = yahooFeed.openStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        StringBuilder out = new StringBuilder();
        String brLine;
        while ((brLine = br.readLine()) != null) {
            out.append(brLine);
        }

        System.out.println(out.toString());

		return out.toString();
	}
	
	public String yahooHistory(String ticker, long from, long to) throws Exception {
        String QUERYURL = "https://query1.finance.yahoo.com/v7/finance/chart/";
        String quoteSite = QUERYURL.concat(ticker).concat("?")
                       + "symbol=" + ticker
                       + "&period1=" + from
                       + "&period2=" + to
                       + "&interval=1d&indicators=quote&includeTimestamps=true";
        StringBuilder STOCK_URL = new StringBuilder(quoteSite);
        URL url = new URL(STOCK_URL.toString());
        System.out.println("QuoteSite QuoteSite:= " + quoteSite);
		InputStream is = url.openStream();
		StringBuilder builder = new StringBuilder();
	    Scanner scan = new Scanner(is);
		while(scan.hasNextLine()){
			String line = scan.nextLine();
			builder.append(line);
		}
	
		scan.close();

        System.out.println(builder.toString());	

        return builder.toString();
	}
}