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

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;

@Service("gaService")
public class HelloAnalyticsImpl implements IHelloAnalytics { 
  private static final String APPLICATION_NAME = "GaMajiMoto";
  private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
  private static final String KEY_FILE_LOCATION = "gcmajimoto-958d87dbada8.json";
  private static final java.io.File DATA_STORE_DIR =
            new java.io.File(System.getProperty("user.home"), ".store/reporting_sample");

    public GaData getGAData() throws Exception {
        Analytics analytics = initializeAnalytic();
        String profile = getFirstProfileId(analytics);
        GaData results = getResults(analytics, profile);
        printResults(getResults(analytics, profile));
        return results;
    }

  private static Analytics initializeAnalytic() throws GeneralSecurityException, IOException {
    HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();

    Resource resource = new ClassPathResource(KEY_FILE_LOCATION);
    GoogleCredential credential = GoogleCredential
                .fromStream(resource.getInputStream())
                .createScoped(AnalyticsScopes.all());
    
    System.out.println("DATA_STORE_DIR:= " + DATA_STORE_DIR);
    

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
      Webproperties properties = analytics.management().webproperties().list("~all").execute();

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
    System.out.println("printResults().results:= "+ results);
    System.out.println("printResults().results.getRows():= " + results.getRows());
    if (results != null && !results.getRows().isEmpty()) {
      System.out.println("View (Profile) Name: "
        + results.getProfileInfo().getProfileName());
      System.out.println("Total Sessions: " + results.getRows().get(0).get(0));
    } else {
      System.out.println("No results found");
    }
  }
}    
  