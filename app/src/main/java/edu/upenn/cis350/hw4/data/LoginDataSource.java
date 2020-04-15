package edu.upenn.cis350.hw4.data;

import java.io.IOException;
import java.net.URL;

/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
public class LoginDataSource {

    public Result<Person> login(String username, String password) {


        try {
            URL url = new URL("http://10.0.2.2:3000/loginPerson?username=" + username+
                    "&password="+password);
            //url = new URL("http://10.0.2.2:3000/loginPerson?username=ali" +
             //       "&password=p");
            URL[] urls = new URL[1];
            urls[0] = url;
            AccessWebTask task = new AccessWebTask();
            task.execute(urls);
            Person[] people = task.get();
            if (people == null || people.length == 0) {
                return null;
            }
            return new Result.Success<Person>(people[0]);
        }catch (Exception e){
            return null;
        }




    }

    public void logout() {
        // TODO: revoke authentication
    }
}
