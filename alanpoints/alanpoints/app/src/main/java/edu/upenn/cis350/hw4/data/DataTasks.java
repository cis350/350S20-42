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

    public static void requestProcedure(String username, String note, String hospital, String procedure) {
        try {
            String temp = "http://10.0.2.2:3000/requestProcedure?username=" + username +
                    "&note=" + note + "&hospital=" + hospital + "&procedure=" + procedure;
            System.out.println(temp);
            URL url = new URL(temp);
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

    public static Person loginCheck(Person p) {
        String[] str = {p.getUsername(), p.getPassword()};
        return loginCheck(str);
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

    public static Appointment[] acquireProcedures(String hospital) {
        try {
            String input = "http://10.0.2.2:3000/procedures";
            if (hospital != null) {
                input = input + "?hospital=" + hospital;
            }
            URL url = new URL(input);
            ProcedureWebTask task = new ProcedureWebTask();
            task.execute(url);
            Appointment[] success = task.get();
            if (success == null) {
                return null;
            } else {
                return success;
            }
        }
        catch (Exception e) {
            throw new IllegalStateException();
        }
    }

    public static String[] acquireHospitals() {
        try {
            String input = "http://10.0.2.2:3000/hospitals";
            URL url = new URL(input);
            HospitalWebTask task = new HospitalWebTask();
            task.execute(url);
            String[] success = task.get();
            if (success == null) {
                return null;
            } else {
                return success;
            }
        }
        catch (Exception e) {
            throw new IllegalStateException();
        }
    }
}
