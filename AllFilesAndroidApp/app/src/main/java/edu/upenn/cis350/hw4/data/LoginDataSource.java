package edu.upenn.cis350.hw4.data;

import java.io.IOException;
import java.net.URL;

/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
public class LoginDataSource {

    public Result<Person> login(String username, String password) {


        try {

            //url = new URL("http://10.0.2.2:3000/loginPerson?username=ali" +
             //       "&password=p");
            String[] strings = {username, password};
            AccessWebTask task = new AccessWebTask();
            task.execute(strings);
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
