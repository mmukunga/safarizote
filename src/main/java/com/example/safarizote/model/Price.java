package com.example.safarizote.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Price {
    public final String open;
    public final String high;
    public final String low;
    public final String current;
    public final String close;
    public final String time;
    public final String day;
    public final String gain;

    public Price(@JsonProperty("o") String open,
            @JsonProperty("h") String high,
            @JsonProperty("l") String low,
            @JsonProperty("c") String current,
            @JsonProperty("pc") String close,
            @JsonProperty("t") String time,
            @JsonProperty("d") String day,
            @JsonProperty("dp") String gain) {
        this.open = open;
        this.high = high;
        this.low = low;
        this.current = current;
        this.close = close;
        this.time = time;
        this.day = day;
        this.gain = gain;
    }
}
