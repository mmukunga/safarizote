package com.example.safarizote.utils;

import com.google.api.services.analytics.model.GaData;

public interface IHelloAnalytics {
    GaData getGAData() throws Exception;
}