package com.example.safarizote.utils;

//import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
//import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.analytics.Analytics;
import com.google.api.services.analytics.AnalyticsScopes;
import com.google.api.services.analytics.model.Accounts;
import com.google.api.services.analytics.model.GaData;
import com.google.api.services.analytics.model.Profiles;
import com.google.api.services.analytics.model.Webproperties;

//import org.springframework.core.io.ClassPathResource;
//import org.springframework.core.io.Resource;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;

@Service("gaService")
public class HelloAnalyticsImpl implements IHelloAnalytics { 
  //private static final String APPLICATION_NAME = "GaMajiMoto";
  //private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
  //private static final String KEY_FILE_LOCATION = "gcmajimoto-958d87dbada8.json";
  //
  //
  // Path to client_secrets.json file downloaded from the Developer's Console.
  // The path is relative to HelloAnalytics.java.
  private static final String CLIENT_SECRET_JSON_RESOURCE = "gcmajimoto-958d87dbada8.json";

  // The directory where the user's credentials will be stored.
  private static final File DATA_STORE_DIR = new File(
      System.getProperty("user.home"), ".store/hello_analytics");

  private static final String APPLICATION_NAME = "GaMajiMoto";
  private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
  //private static NetHttpTransport httpTransport;
  private static FileDataStoreFactory dataStoreFactory;

    public GaData getGAData() throws Exception {
        Analytics analytics = initializeAnalytic();
        String profile = getFirstProfileId(analytics);
        GaData results = getResults(analytics, profile);
        printResults(getResults(analytics, profile));
        return results;
    }

  private static Analytics initializeAnalytic() throws GeneralSecurityException, IOException {
    HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();

    //Resource resource = new ClassPathResource(KEY_FILE_LOCATION);
    /*GoogleCredential credential = GoogleCredential
                .fromStream(resource.getInputStream())
                .createScoped(AnalyticsScopes.all());*/
    
    httpTransport = GoogleNetHttpTransport.newTrustedTransport();
    dataStoreFactory = new FileDataStoreFactory(DATA_STORE_DIR);

    // Load client secrets.
    GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY,
        new InputStreamReader(HelloAnalyticsImpl.class
            .getResourceAsStream(CLIENT_SECRET_JSON_RESOURCE)));

    // Set up authorization code flow for all auth scopes.
    GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow
        .Builder(httpTransport, JSON_FACTORY, clientSecrets,
        AnalyticsScopes.all()).setDataStoreFactory(dataStoreFactory)
        .build();

    // Authorize.
    Credential credential = new AuthorizationCodeInstalledApp(flow,
        new LocalServerReceiver()).authorize("user");
                                
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
      //Webproperties properties0 = analytics.management().webproperties()
      //    .list(firstAccountId).execute();
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
  