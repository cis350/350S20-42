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

public class AccessWebTask extends AsyncTask<String, String, Person[]> {
    /*This method is called in background when this object's "execute" method is invoked.The arguments passed to "execute" are passed to this method.*/
    protected Person[] doInBackground(String... strArr) {
        try {
            // get the first URL from the array
            URL url = new URL("http://10.0.2.2:3000/loginPerson?username=" + strArr[0]+
                    "&password="+strArr[1]);
            System.out.println(url);
            Person[] people = new Person[1];
            // create connection and send HTTP request
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            // open connection and send HTTP request
            conn.connect();
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
                    JSONObject data = (JSONObject) result.get("person");
                    //JSONObject data = (JSONObject) dataT.get(0);
                    System.out.println(data);
                    // read the "message" field from the JSON object
                    String user = (String) data.get("username");
                    System.out.println(user);
                    String pass = (String) data.get("password");
                    System.out.println(pass);
                    JSONArray vac = (JSONArray) data.get("vaccines");
                    Vaccine[] vaccines = new Vaccine[vac.size()];
                    System.out.println("Broken here?");
                    for (int i = 0; i < vac.size(); i++) {
                        System.out.println("Run start");
                        String id = (String)((JSONObject)vac.get(i)).get("id");
                        String date = (String)((JSONObject)vac.get(i)).get("date");
                        String hospitalId = (String)((JSONObject)vac.get(i)).get("hospitalId");
                        Boolean verified = (Boolean) ((JSONObject)vac.get(i)).get("verified");
                        vaccines[i] = new Vaccine(id, date, hospitalId, verified);
                        System.out.println("Run end");
                    }
                    JSONArray trav = (JSONArray) data.get("travels");
                    Travel[] travels = new Travel[trav.size()];
                    System.out.println("Travel not Broken?");
                    for (int i = 0; i < trav.size(); i++) {
                        System.out.println("Run start");
                        String country = (String)((JSONObject)trav.get(i)).get("country");
                        String start = (String)((JSONObject)trav.get(i)).get("start");
                        String end = (String)((JSONObject)trav.get(i)).get("end");
                        travels[i] = new Travel(country, start, end);
                        System.out.println("Run end");
                    }
                    Person p = new Person(user, pass);
                    System.out.println("Not here");
                    p.setVaccines(vaccines);
                    p.setTravels(travels);
                    System.out.println("Na");
                    p.setFullName((String)data.get("fullName"));
                    System.out.println("Nb");
                    p.setEmail((String)data.get("email"));
                    System.out.println("Nc");
                    p.setBlood((String)data.get("blood"));
                    System.out.println("Nd");
                    p.setDob((String)data.get("dob"));
                    System.out.println("Not hereee");
                    //p.setFullName((String) data.get("fullName"));
                    people[0]=(p);
                    System.out.println("Made it to the end");

                }
                // if using the provided Node Express starter code,
                // this should print "It works!"

            }
            return people;
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