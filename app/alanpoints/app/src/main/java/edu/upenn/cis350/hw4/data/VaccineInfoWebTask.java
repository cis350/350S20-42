package edu.upenn.cis350.hw4.data;

import android.os.AsyncTask;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.IOException;
import java.net.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Scanner;

public class VaccineInfoWebTask extends AsyncTask<String, String, VaccineInfo[]> {
    /*This method is called in background when this object's "execute" method is invoked.The arguments passed to "execute" are passed to this method.*/
    protected VaccineInfo[] doInBackground(String... strArr) {
        try {
            // get the first URL from the array
            URL url = new URL("http://10.0.2.2:3000/allVaccineInfo");
            System.out.println(url);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            System.out.println('a');
            conn.setRequestMethod("GET");
            VaccineInfo[] vaccines = null;
            // open connection and send HTTP request
            System.out.println('d');
            conn.connect();
            System.out.println('c');
            // now the response comes back
            int responsecode = conn.getResponseCode();
            // make sure the response has "200 OK" as the status
            if (responsecode != 200) {
                System.out.println("Unexpected status code: " + responsecode);
            } else {
                // made it here, we got a good response, let's read it
                Scanner in = new Scanner(url.openStream());

                while (in.hasNext()) {
                    // read the next line of the body of the response
                    String line = in.nextLine();

                    System.out.println(line);
                    // the rest of this code assumes that the body contains JSON
                    JSONParser parser = new JSONParser();
                    System.out.println(0);
                    JSONObject result = (JSONObject) parser.parse(line);
                    System.out.println(result);
                    if (!result.get("status").equals("success")) {
                        System.out.println("not found");
                        return null;
                    }
                    System.out.println(1);

                    JSONArray vac = (JSONArray) result.get("vaccines");
                    vaccines = new VaccineInfo[vac.size()];
                    for (int i = 0; i < vac.size(); i++) {
                        String id = (String)((JSONObject)vac.get(i)).get("id");
                        String name = (String)((JSONObject)vac.get(i)).get("name");
                        String info = (String)((JSONObject)vac.get(i)).get("info");
                        vaccines[i] = new VaccineInfo(id, name, info);
                    }

                }
                // if using the provided Node Express starter code,
                // this should print "It works!"

            }
            return vaccines;
        } catch (IOException e) {
            throw new IllegalStateException();
        } catch (Exception e) {
            System.out.print(e.toString());
            return null;
        }

    }


    /*This method is called in foreground after doInBackground finishes.It can access and update Views in user interface.*/
    protected void onPostExecute(String msg) {
        // not implemented but you can use this if you’d like}}
    }
}
