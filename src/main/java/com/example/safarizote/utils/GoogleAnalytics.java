package com.example.safarizote.utils;

import com.google.api.services.analyticsreporting.v4.model.GetReportsResponse;

public interface GoogleAnalytics {
    GetReportsResponse getGAData() throws Exception;
}