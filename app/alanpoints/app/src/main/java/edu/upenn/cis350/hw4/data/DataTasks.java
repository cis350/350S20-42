package edu.upenn.cis350.hw4.data;

import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;

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

    public static void createReview(String username, String hospital, String review) {
        try {
            String temp = "http://10.0.2.2:3000/addReview?username=" + username +
                    "&hospital=" + hospital + "&review=" + review;
            System.out.println(temp);
            URL url = new URL(temp);
            ObjectWebTask task = new ObjectWebTask();
            task.execute(url);
            String success = task.get();
            System.out.println(success);
            return;
        } catch (Exception e) {
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
            System.out.println("LOGINCHECK");
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
                return new Appointment[0];
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
                return new String[0];
            } else {
                return success;
            }
        }
        catch (Exception e) {
            throw new IllegalStateException();
        }
    }

    public static Review[] acquireReviews(String hospital) {
        try {
            String input = "http://10.0.2.2:3000/reviews?hospital="+hospital;
            System.out.println(input);
            URL url = new URL(input);
            WriterWebTask task = new WriterWebTask();
            task.execute(url);
            Review[] success = task.get();
            if (success == null) {
                return new Review[0];
            } else {
                return success;
            }
        }
        catch (Exception e) {
            throw new IllegalStateException();
        }
    }

    public static CompletedProcedure[] acquireCompleted(String username, String hospital) {
        try {
            String input = "http://10.0.2.2:3000/allDoneProcedures?username="+username+
                    "&hospital="+hospital;
            System.out.println(input);
            URL url = new URL(input);
            CompleteProcedureWebTask task = new CompleteProcedureWebTask();
            task.execute(url);
            CompletedProcedure[] success = task.get();
            if (success == null) {
                return new CompletedProcedure[0];
            } else {
                return success;
            }
        }
        catch (Exception e) {
            throw new IllegalStateException();
        }
    }

    public static VaccineInfo[] getVaccineInfo() {
        try {
            VaccineInfoWebTask task = new VaccineInfoWebTask();
            task.execute(new String[0]);
            VaccineInfo[] result = task.get();
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException();
        }

    }

    public static Date DateConvert(String str) {
        try {
            if (str == null) {
                return null;
            }
            if (str.equalsIgnoreCase("NotSet") || str.equals("")) {
                return new Date();
            }
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
            Date date = formatter.parse(str.replaceAll("Z$", "+0000"));
            return date;
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException();
        }
    }
}
