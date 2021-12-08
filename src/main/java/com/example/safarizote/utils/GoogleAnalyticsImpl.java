package com.example.safarizote.utils;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
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

import java.io.IOException;
import java.io.InputStream;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service("gaService")
public class GoogleAnalyticsImpl implements GoogleAnalytics {
  private static final String CLIENT_SECRET_JSON_RESOURCE = "/gcmajimoto-538e2637d707.json";
  // Replace with your view ID.
  private static final String VIEW_ID = "ga:256484158";
  private static final String APPLICATION_NAME = "GaMajiMoto";
  private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

  public GetReportsResponse getGAData() throws Exception {
      System.out.println("1. getGAData() Start..1"); 
      AnalyticsReporting service = initializeAnalyticsReporting();
      System.out.println("2. getGAData() Start..2"); 
      GetReportsResponse response = getReport(service);
      System.out.println("3. getGAData() Start..3"); 
      printResponse(response);  
      System.out.println("4. getGAData() End OK!!"); 
      return response;
  }

  private static AnalyticsReporting initializeAnalyticsReporting() throws GeneralSecurityException, IOException {
    HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
    /*List<String> SCOPES = Arrays.asList(
      "https://www.googleapis.com/auth/analytics",
      "https://www.googleapis.com/auth/analytics.readonly"
    );*/

    //Set<String> SCOPES = Collections.singleton("https://www.googleapis.com/auth/analytics.readonly");
    System.out.println("11. sdfdff ");
    Set<String> scopes = AnalyticsReportingScopes.all(); 
    System.out.println("12. sdfdff ");
    Set<String> SCOPES = Collections.singleton(AnalyticsReportingScopes.ANALYTICS_READONLY);
    System.out.println("13. sdfdff ");
    InputStream credentialsJSON = GoogleAnalyticsImpl.class.getClassLoader().getResourceAsStream(CLIENT_SECRET_JSON_RESOURCE);
    System.out.println("14. sdfdff ");
    GoogleCredential credential = GoogleCredential.fromStream(credentialsJSON, httpTransport, JSON_FACTORY).createScoped(scopes);
    System.out.println("15. sdfdff ");
    if (!credential.refreshToken()) {
      throw new RuntimeException("Failed OAuth to refresh the token");
    }
    System.out.println("Refreshed: expires in: " + credential.getExpiresInSeconds());
    String accessToken = credential.getAccessToken();
    System.out.println("Access token: " + accessToken);
    credential.setAccessToken(accessToken);

    System.out.println("getServiceAccountId(): " + credential.getServiceAccountId());
    System.out.println("getServiceAccountScopes(): " + credential.getServiceAccountScopes());        
    AnalyticsReporting  analyticReporting = new AnalyticsReporting.Builder(httpTransport, JSON_FACTORY, credential)
    .setApplicationName(APPLICATION_NAME).build();
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
    System.out.println("1. getReport() ..");     
    // Call the batchGet method.
    GetReportsResponse response = service.reports().batchGet(getReport).execute();
    System.out.println("2. getReport() End OK!!"); 
    // Return the response.
    return response;
  }

  /**
   * Parses and prints the Analytics Reporting API V4 response.
   *
   * @param response the Analytics Reporting API V4 response.
   */
  private static void printResponse(GetReportsResponse response) {   
    for (Report report: response.getReports()) {
      ColumnHeader header = report.getColumnHeader();
      List<String> dimensionHeaders = header.getDimensions();
      List<MetricHeaderEntry> metricHeaders = header.getMetricHeader().getMetricHeaderEntries();
      List<ReportRow> rows = report.getData().getRows();
      
      if (rows == null) {
         System.out.println("No data found for " + VIEW_ID);
         return;
      }
      
      for (ReportRow row: rows) {      
        List<String> dimensions = row.getDimensions();
        List<DateRangeValues> metrics = row.getMetrics();
        for (int i = 0; i < dimensionHeaders.size() && i < dimensions.size(); i++) {
          System.out.println(dimensionHeaders.get(i) + ": " + dimensions.get(i));
        }
       
        for (int j = 0; j < metrics.size(); j++) {
          System.out.print("Date Range (" + j + "): ");
          DateRangeValues values = metrics.get(j);
          for (int k = 0; k < values.getValues().size() && k < metricHeaders.size(); k++) {
            System.out.println(metricHeaders.get(k).getName() + ": " + values.getValues().get(k));
          }
        }    
      }
    }
  }
}
