package edu.upenn.cis350.hw4.data;

import java.net.URL;

public class DataTasks {
    public static void createLogin(String username, String password, String name) {
        try {
            URL url = new URL("http://10.0.2.2:3000/create?username=" + username +
                    "&password=" + password+"&fullName=" + name);
            ObjectWebTask task = new ObjectWebTask();
            task.execute(url);
            String success = task.get();
            System.out.println(success);
            return;
        }
        catch (Exception e) {
            throw new IllegalStateException();
        }
    }

    public static Person loginCheck(String[] credentials) {
        try {
            AccessWebTask task = new AccessWebTask();
            task.execute(credentials);
            Person[] success = task.get();
            System.out.println(success);
            if (success == null) {
                return null;
            } else {
                return success[0];
            }
        }
        catch (Exception e) {
            throw new IllegalStateException();
        }
    }
}
