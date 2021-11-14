package com.example.safarizote.utils;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.analytics.Analytics;
import com.google.api.services.analytics.AnalyticsScopes;
import com.google.api.services.analytics.model.Accounts;
import com.google.api.services.analytics.model.GaData;
import com.google.api.services.analytics.model.Profiles;
import com.google.api.services.analytics.model.Webproperties;
import com.google.api.services.analytics.model.Webproperty;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;

@Service("gaService")
public class HelloAnalyticsImpl implements IHelloAnalytics { 
  private static final String APPLICATION_NAME = "gaSafarizote";
  private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
  private static final String KEY_FILE_LOCATION = "gaSafarizote-2e51f4174cf8.json";
  
    public GaData getGAData() throws Exception {
        System.out.println("1.gaService.getGAData()");
        Analytics analytics = initializeAnalytic();
        System.out.println("2.gaService.getGAData()");
        String profile = getFirstProfileId(analytics);
        System.out.println("3.gaService.getGAData()");
        GaData results = getResults(analytics, profile);
        System.out.println("4.gaService.getGAData()");
        printResults(getResults(analytics, profile));
        System.out.println("5.gaService.getGAData()");
        return results;
    }

  private static Analytics initializeAnalytic() throws GeneralSecurityException, IOException {
    HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();

    Resource resource = new ClassPathResource(KEY_FILE_LOCATION);
    GoogleCredential credential = GoogleCredential
            .fromStream(resource.getInputStream())
            .createScoped(AnalyticsScopes.all());

    return new Analytics.Builder(httpTransport, JSON_FACTORY, credential)
        .setApplicationName(APPLICATION_NAME).build();
  }


  private static String getFirstProfileId(Analytics analytics) throws IOException {
    String profileId = null;
    Accounts accounts = analytics.management().accounts().list().execute();

    if (accounts.getItems().isEmpty()) {
      System.err.println("No accounts found");
    } else {
      String firstAccountId = accounts.getItems().get(0).getId();
      System.out.println("firstAccountId:= " + firstAccountId);
      Webproperties properties = analytics.management().webproperties()
          .list(firstAccountId).execute();
      System.out.println("properties:= " + properties);
      
      for (Webproperty property : properties.getItems()) {
        System.out.println("Account ID: " + property.getAccountId());
        System.out.println("Property ID: " + property.getId());
        System.out.println("Property Name: " + property.getName());
        System.out.println("Property Profile Count: " + property.getProfileCount());
        System.out.println("Property Industry Vertical: "
            + property.getIndustryVertical());
        System.out.println("Property Internal Id: "
            + property.getInternalWebPropertyId());
        System.out.println("Property Level: " + property.getLevel());
        if (property.getWebsiteUrl() != null) {
          System.out.println("Property URL: " + property.getWebsiteUrl());
        }
        System.out.println("Property Created: " + property.getCreated());
        System.out.println("Property Updated: " + property.getUpdated());
      }

      Webproperties properties2 = analytics.management().webproperties().list("~all").execute();
      for (Webproperty property : properties2.getItems()) {
        System.out.println("Account ID: " + property.getAccountId());
        System.out.println("Property ID: " + property.getId());
        System.out.println("Property Name: " + property.getName());
        System.out.println("Property Profile Count: " + property.getProfileCount());
        System.out.println("Property Industry Vertical: "
            + property.getIndustryVertical());
        System.out.println("Property Internal Id: "
            + property.getInternalWebPropertyId());
        System.out.println("Property Level: " + property.getLevel());
        if (property.getWebsiteUrl() != null) {
          System.out.println("Property URL: " + property.getWebsiteUrl());
        }
        System.out.println("Property Created: " + property.getCreated());
        System.out.println("Property Updated: " + property.getUpdated());
      }

      if (properties.getItems().isEmpty()) {
        System.err.println("No Webproperties found");
      } else {
        String firstWebpropertyId = properties.getItems().get(0).getId();

        Profiles profiles = analytics.management().profiles()
            .list(firstAccountId, firstWebpropertyId).execute();

        if (profiles.getItems().isEmpty()) {
          System.err.println("No views (profiles) found");
        } else {
          profileId = profiles.getItems().get(0).getId();
        }
      }
    }
    return profileId;
  }

  private static GaData getResults(Analytics analytics, String profileId) throws IOException {
    return analytics.data().ga()
        .get("ga:" + profileId, "7daysAgo", "today", "ga:sessions")
        .execute();
  }

  private static void printResults(GaData results) {
    if (results != null && !results.getRows().isEmpty()) {
      System.out.println("View (Profile) Name: "
        + results.getProfileInfo().getProfileName());
      System.out.println("Total Sessions: " + results.getRows().get(0).get(0));
    } else {
      System.out.println("No results found");
    }
  }
}    
  