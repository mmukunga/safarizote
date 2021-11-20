package com.example.safarizote.utils;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.auth.oauth2.Credential;

import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;

import com.google.api.client.http.HttpTransport;
import com.google.api.services.analytics.Analytics;
import com.google.api.services.analytics.model.Accounts;
import com.google.api.services.analytics.model.GaData;
import com.google.api.services.analytics.model.Profiles;
import com.google.api.services.analytics.model.Webproperties;
import com.google.api.services.analyticsreporting.v4.AnalyticsReportingScopes;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;


@Service("gaService")
public class HelloAnalyticsImpl implements IHelloAnalytics {
  private static final String APPLICATION_NAME = "GaMajiMoto";
  private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
  private static final String KEY_FILE_LOCATION = "gcmajimoto-958d87dbada8.json";
  // private static final java.io.File DATA_STORE_DIR =
  // new java.io.File(System.getProperty("user.home"), ".store/reporting_sample");  

  private static final File DATA_STORE_DIR = new File(new File(System.getProperty("java.io.tmpdir")), "hello_analytics");
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
    if(DATA_STORE_DIR.exists()){
      System.out.println("DATA_STORE_DIR EXISTS");
    } else {
      DATA_STORE_DIR.mkdirs();
    }

    httpTransport = GoogleNetHttpTransport.newTrustedTransport();
    dataStoreFactory = new FileDataStoreFactory(DATA_STORE_DIR);
    System.out.println(HelloAnalyticsImpl.class.getClassLoader().getResourceAsStream(KEY_FILE_LOCATION));
    // Load client secrets.
    GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY,
        new InputStreamReader(HelloAnalyticsImpl.class.getClassLoader().getResourceAsStream("gcmajimoto-958d87dbada8.json")));
    
    //System.out.println(clientSecrets.getDetails().getClientSecret());
    System.out.println(clientSecrets);

    GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
      httpTransport, 
      JSON_FACTORY,
      "106423389543943811455", 
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDb3NyxcPPDBVBe\nRRHvZY6OKPTlaKtH4FtcwFZhrFvOB0IoQ0VkQkKJR7re28vXOY15Jijf9Fma3yZQ\nT8TFjmXT74lWlDq+j6tCaTJVhcdw7b+QJOaSTeFq2R35o28RjdkRlKQq3dP3hj9C\ncMvVDL3uLyrtE5rZCEMOCAA5qiEX3TsZzeGmdEN0VgQykIkSpQolpJwt6suvfQeP\n7BNC97PccY3LQViYFFQljrJVGgoqUrnjl/2onyTdjgvkGRNaKQ3+i3JVkvkvlSOu\n7ftx0CbOOBgTFGBDQydFf33Dy42ovu60WN3je0swyBWzuXfEDPU6gXjt9yiP6ZUE\ns20bC/lFAgMBAAECggEAbSSbY/SL9ayOJHYKPLrABT88ryOCH4i3IfiTCSKsYj8F\nLwKSEH66E/cJQ7d93eZCnjj8woxE7RZIqUaoCmAxmX+IQHQOI2ojnLCnHYBvLNbB\nKVfAJDHILKgCctoYeXDeqJUO1/7NyksY3S0saqNMJ9C/cPgx/vpUe0MqhXW4vuSW\n8yRdb7JIb5cqKdqEegBG4plfPLv6eekba9lsH1GjRgGNIsHpWG3c6ooyvtBhVztl\nVVO6kmjRTdnUuOiC8hCOlxlfauq2793m2O40jyEge646zAJG7Av7g+ujAElK8d5i\nhSyniHIW4DclU3D/QntCmw52enSgf9G2uCBStdZukwKBgQDveFe+uXogjt8YxVfw\nfp6gQPsUsAu9I2Zmfh+q6q368V755Ro3z42H9auwZntO84QhvfqmjGA3OpAAXgrh\nlbOe13H3PtQTxYzj71bkKDD+8rjr/KISvvtwqU7quVrX5Wt+H+PEgLgq1YaOGgps\nyJsEF9dAFf5IIC0C4E5ToOoV5wKBgQDrCgoY1l9I8GnG1yhQFi5bTCulMhPEsgLw\nVRkDv4JOZaJ3OP/PjASG1gcnlZNZDL4OuGYhKiOaJbM8UvsoLr8m5Wk2H9JCLdFB\nkkPy/XQ+A3j7y37XoKfjrvWoQnfEOoEefPGsMYSqSFTQ2bSv66j7zJFaNkRq64z5\n3r9rRal58wKBgQCtIO8nF4dhBInsqbgTSie6qmAcK87A1lgRH3wboIFaHKlSt70F\nvouPUSDobp8VjF7p2iTdxj1FkJRNf7AUOZvb6d0eKJFBHiDnJcFHQHtzxt3E1ygB\nr4uvfuhsMMepsNbPH5UXGwyLA0a9c7w3u6y+/9GCJqRpVsHUA4D9WygB3wKBgGt8\nnN988fh2UbloXfw6GJsR+4fBnf6+9c8Y66amJx5ZJnJlc79jphJPwNfedJMt26D5\nvWL/VWbCRPSaclePAUX1dicVaF9xepgFHuP5+vX9Oo/UIT7VLtJWCewX8ZOgubnK\no+7+elAxYfBdD1/AYvg8NmDOHn3TGRaQQnP5WKb3AoGAU6+dL42MesRRaeSnoI3q\nM+uzH6wdfouwWo1x2nTnhc7X9ae3Xu+ymmI+A1ox8vt6arpsX9GHT13nEZpN/xlX\nioWSycxLTRjhnPKpe8EtJ/KITcTO+Ixh+68iyC6JOEf0ZMZP46Cv+GgZEGS8Z3xG\nBVZtBnW6tcrVniL4wi6H6wg=\n-----END PRIVATE KEY-----\n", 
      AnalyticsReportingScopes.all())
      .setDataStoreFactory(dataStoreFactory)
      .setAccessType("offline").build();

    System.out.println("5.DATA_STORE_DIR");
    Credential credential = new AuthorizationCodeInstalledApp(flow, new LocalServerReceiver()).authorize("user");
    System.out.println("6.DATA_STORE_DIR:= " + credential);

    return new Analytics.Builder(httpTransport, JSON_FACTORY, credential).setApplicationName(APPLICATION_NAME).build();
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

        Profiles profiles = analytics.management().profiles().list(firstAccountId, firstWebpropertyId).execute();

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
    return analytics.data().ga().get("ga:" + profileId, "7daysAgo", "today", "ga:sessions").execute();
  }

  private static void printResults(GaData results) {
    System.out.println("printResults().results:= " + results);
    System.out.println("printResults().results.getRows():= " + results.getRows());
    if (results != null && !results.getRows().isEmpty()) {
      System.out.println("View (Profile) Name: " + results.getProfileInfo().getProfileName());
      System.out.println("Total Sessions: " + results.getRows().get(0).get(0));
    } else {
      System.out.println("No results found");
    }
  }
}
