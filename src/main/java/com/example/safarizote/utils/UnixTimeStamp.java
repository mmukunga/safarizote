package com.example.safarizote.utils;

import java.io.IOException;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class UnixTimeStamp extends JsonDeserializer<Date> {

    @Override
    public Date deserialize(JsonParser parser, DeserializationContext context)
            throws IOException, JsonProcessingException {
        String unixTimestamp = parser.getText().trim();
        return new Date(TimeUnit.SECONDS.toMillis(Long.valueOf(unixTimestamp)));
    }
}