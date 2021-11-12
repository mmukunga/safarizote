package com.example.safarizote.utils;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.analytics.Analytics;
import com.google.api.services.analytics.model.Accounts;
import com.google.api.services.analytics.model.GaData;
import com.google.api.services.analytics.model.Profiles;
import com.google.api.services.analytics.model.Webproperties;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;

import org.springframework.stereotype.Service;
/**
 * A simple example of how to access the Google Analytics API using a service
 * account.
 */
@Service("gaService")
public class AnalyticsUtils implements IGAService{
    private static final String APPLICATION_NAME = "safarizote";
    private static final JsonFactory JSON_FACTORY = new JacksonFactory();
    //private static final String KEY_FILE_LOCATION = "credentials.json";

    public GaData getGAData() throws Exception {
        Analytics analytics = initializeAnalytics();
        System.out.println("1.First Profile Id!" );
        String profile = getFirstProfileId(analytics);
        System.out.println("2.First Profile Id: " + profile);
        printResults(getResults(analytics, profile));
        return getResults(analytics, profile);
  }

    private static Analytics initializeAnalytics()
        throws GeneralSecurityException, IOException {
        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        /*GoogleCredential credential = GoogleCredential
                .fromStream(new FileInputStream(KEY_FILE_LOCATION))
                .createScoped(AnalyticsScopes.all());  */     
       
      //          Resource resource = new ClassPathResource("credentials.json");
      //GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());  
      GoogleCredentials credentials = GoogleCredentials.getApplicationDefault().createScoped(Arrays.asList("https://www.googleapis.com/auth/cloud-platform")); 
       HttpRequestInitializer requestInitializer = new HttpCredentialsAdapter(credentials); 

        // Analytics
        return new Analytics
                .Builder(httpTransport, JSON_FACTORY, requestInitializer)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    private static String getFirstProfileId(Analytics analytics) throws IOException {
        // First view (profile) ID
        String profileId = null;
        Accounts accounts = analytics.management().accounts().list().execute();
        if (accounts.getItems().isEmpty()) {
            System.err.println("No accounts found");
        } else {
            String firstAccountId = accounts.getItems().get(0).getId();
            // First Account
            Webproperties properties = analytics.management().webproperties()
                    .list(firstAccountId).execute();
            if (properties.getItems().isEmpty()) {
                System.err.println("No Webproperties found");
            } else {
                String firstWebpropertyId = properties.getItems().get(0).getId();
                Profiles profiles = analytics.management().profiles()
                        .list(firstAccountId, firstWebpropertyId).execute();
                if (profiles.getItems().isEmpty()) {
                    System.err.println("No views (profiles) founde");
                } else {
                    profileId = profiles.getItems().get(0).getId();
                }
            }
        }
        return profileId;
    }

    private static GaData getResults(
            Analytics analytics,
            String profileId
            ) throws IOException {
        return analytics.data().ga()
            .get("ga:" + profileId, "7daysAgo", "today", "ga:sessions")
            .execute();
    }

    private static void printResults(GaData results) {
        if (results != null && !results.getRows().isEmpty()) {
            System.out.println("View (Profile) Name: "
                    + results.getProfileInfo().getProfileName());
            System.out.println("Total Sessions: "
                    + results.getRows().get(0).get(0));
        } else {
            System.out.println("No results found");
        }
    }

}

