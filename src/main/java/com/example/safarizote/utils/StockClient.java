package com.example.safarizote.utils;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

import com.example.safarizote.model.Stock;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.util.Charsets;
import com.google.common.io.CharStreams;

public class StockClient {
    private static final ObjectMapper MAPPER = new ObjectMapper();

    public static List<Stock> getStockDetails(String symbol) throws Exception {
        String token = "61f830139147a5.28651595";
        String fmt = "json";
        String additionals = "KIT.OL,TIETO.OL,SAS.CO,NEL.OL,XXL.OL";
        String stockUrlQuery = URLEncoder.encode(symbol.toUpperCase(), StandardCharsets.UTF_8);

        URL url = new URL("https://eodhistoricaldata.com/api/real-time/" + stockUrlQuery + "?api_token=" + token
                + "&fmt=" + fmt + "&s=" + additionals);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("accept", "application/json");
        InputStream responseStream = connection.getInputStream();

        String json = CharStreams.toString(new InputStreamReader(
                responseStream, Charsets.UTF_8));

        List<Stock> stocks = Arrays.asList(MAPPER.readValue(json, Stock[].class));
        return stocks;
    }
}
