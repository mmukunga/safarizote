package com.example.safarizote.utils;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.analyticsreporting.v4.AnalyticsReporting;
import com.google.api.services.analyticsreporting.v4.AnalyticsReportingScopes;
import com.google.api.services.analyticsreporting.v4.model.ColumnHeader;
import com.google.api.services.analyticsreporting.v4.model.DateRange;
import com.google.api.services.analyticsreporting.v4.model.DateRangeValues;
import com.google.api.services.analyticsreporting.v4.model.Dimension;
import com.google.api.services.analyticsreporting.v4.model.GetReportsRequest;
import com.google.api.services.analyticsreporting.v4.model.GetReportsResponse;
import com.google.api.services.analyticsreporting.v4.model.Metric;
import com.google.api.services.analyticsreporting.v4.model.MetricHeaderEntry;
import com.google.api.services.analyticsreporting.v4.model.Report;
import com.google.api.services.analyticsreporting.v4.model.ReportRequest;
import com.google.api.services.analyticsreporting.v4.model.ReportRow;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service("gaService")
public class GoogleAnalyticsImpl implements GoogleAnalytics {
  private static final String CLIENT_SECRET_JSON_RESOURCE = "/gcmajimoto-958d87dbada8.json";

  // Replace with your view ID.
  private static final String VIEW_ID = "256217453";

  // The directory where the user's credentials will be stored.
  private static final File DATA_STORE_DIR = new File(
      System.getProperty("java.io.tmpdir"), "/hello_analytics");

  private static final String APPLICATION_NAME = "GaMajiMoto";
  private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
  private static NetHttpTransport httpTransport;
  private static FileDataStoreFactory dataStoreFactory;

  public GetReportsResponse getGAData() {
    try {
      AnalyticsReporting service = initializeAnalyticsReporting();
      GetReportsResponse response = getReport(service);
      System.out.println("Macharia");
      printResponse(response);  
      System.out.println("Mukunga");   
      return response;

    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }


  private static AnalyticsReporting initializeAnalyticsReporting() throws GeneralSecurityException, IOException {

    httpTransport = GoogleNetHttpTransport.newTrustedTransport();
    dataStoreFactory = new FileDataStoreFactory(DATA_STORE_DIR);

    System.out.println("Maji");
    java.io.InputStream is = GoogleAnalyticsImpl.class.getResourceAsStream(CLIENT_SECRET_JSON_RESOURCE);
    System.out.println(is);
    System.out.println("1Moto");

    GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY,
        new InputStreamReader(GoogleAnalyticsImpl.class
            .getResourceAsStream(CLIENT_SECRET_JSON_RESOURCE)));

    String clientId = clientSecrets.get("client_id").toString();
    String clientSecret = clientSecrets.get("private_key").toString();
    System.out.println("2Moto");
    GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow
        .Builder(httpTransport, JSON_FACTORY, clientId, clientSecret,
            AnalyticsReportingScopes.all()).setDataStoreFactory(dataStoreFactory)
        .build();
        System.out.println("3Moto");
    Credential credential = new AuthorizationCodeInstalledApp(flow,
        new LocalServerReceiver()).authorize("user");
        System.out.println("4Moto");
    AnalyticsReporting  analyticReporting = new AnalyticsReporting.Builder(httpTransport, JSON_FACTORY, credential)
    .setApplicationName(APPLICATION_NAME).build();
    System.out.println("5Moto");
    return analyticReporting;
  }

  private static GetReportsResponse getReport(AnalyticsReporting service) throws IOException {
    // Create the DateRange object.
    DateRange dateRange = new DateRange();
    dateRange.setStartDate("7DaysAgo");
    dateRange.setEndDate("today");

    // Create the Metrics object.
    Metric sessions = new Metric()
        .setExpression("ga:sessions")
        .setAlias("sessions");

    //Create the Dimensions object.
    Dimension browser = new Dimension()
        .setName("ga:browser");

    // Create the ReportRequest object.
    ReportRequest request = new ReportRequest()
        .setViewId(VIEW_ID)
        .setDateRanges(Arrays.asList(dateRange))
        .setDimensions(Arrays.asList(browser))
        .setMetrics(Arrays.asList(sessions));

    ArrayList<ReportRequest> requests = new ArrayList<ReportRequest>();
    requests.add(request);

    // Create the GetReportsRequest object.
    GetReportsRequest getReport = new GetReportsRequest()
        .setReportRequests(requests);

    // Call the batchGet method.
    GetReportsResponse response = service.reports().batchGet(getReport).execute();

    // Return the response.
    return response;
  }

  /**
   * Parses and prints the Analytics Reporting API V4 response.
   *
   * @param response the Analytics Reporting API V4 response.
   */
  private static void printResponse(GetReportsResponse response) {
    System.out.println("1.printResponse..");
    for (Report report: response.getReports()) {
      ColumnHeader header = report.getColumnHeader();
      List<String> dimensionHeaders = header.getDimensions();
      List<MetricHeaderEntry> metricHeaders = header.getMetricHeader().getMetricHeaderEntries();
      List<ReportRow> rows = report.getData().getRows();
      System.out.println("2.printResponse..");
      if (rows == null) {
         System.out.println("No data found for " + VIEW_ID);
         return;
      }
      System.out.println("2.printResponse..");
      for (ReportRow row: rows) {
        System.out.println("2.printResponse..");
        List<String> dimensions = row.getDimensions();
        List<DateRangeValues> metrics = row.getMetrics();
        for (int i = 0; i < dimensionHeaders.size() && i < dimensions.size(); i++) {
          System.out.println(dimensionHeaders.get(i) + ": " + dimensions.get(i));
        }
        System.out.println("3.printResponse..");
        for (int j = 0; j < metrics.size(); j++) {
          System.out.print("Date Range (" + j + "): ");
          DateRangeValues values = metrics.get(j);
          for (int k = 0; k < values.getValues().size() && k < metricHeaders.size(); k++) {
            System.out.println(metricHeaders.get(k).getName() + ": " + values.getValues().get(k));
          }
        }
        System.out.println("4.printResponse..");
      }
    }
  }
}
