package edu.upenn.cis350.hw4;

import android.os.AsyncTask;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

import edu.upenn.cis350.hw4.data.Person;

public class AccessWebAddVaccine extends AsyncTask<URL, String, String> {

    protected String doInBackground(URL... urlArr) {
        try {
            // get the first URL fr
            URL url = urlArr[0];
            // create connection and send HTTP request
            System.out.print(url);
            System.out.println('b');
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            System.out.println('a');
            conn.setRequestMethod("GET");

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
                        return line;}}/*
                    System.out.println(1);
                    JSONObject data = (JSONObject) result.get("person");
                    //JSONObject data = (JSONObject) dataT.get(0);
                    System.out.println(data);
                    // read the "message" field from the JSON object
                    String user = (String) data.get("username");
                    System.out.println(user);
                    String pass = (String) data.get("password");
                    System.out.println(pass);
                    //Vaccine[] vac = (Vaccine[]) data.get("vaccines");
                    Person p = new Person(user, pass);
                    //p.setFullName((String) data.get("fullName"));
                    people[0]=(p);

                }
                // if using the provided Node Express starter code,
                // this should print "It works!"

            }
            return people;
            */
            return "";
        } catch (IOException e) {
            throw new IllegalStateException();
        } catch (Exception e) {
            System.out.print(e.toString());
            return "";
        }

    }




}
