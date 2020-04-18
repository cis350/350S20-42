package edu.upenn.cis350.hw4.data;


import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Vaccine implements Serializable {
    String id;
    Date date;
    String hospitalId;
    Boolean verified;

    public Vaccine(String id, String date, String hospitalId, Boolean verified) {
        this.id = id;
        this.date = DateConvert(date);
        this.hospitalId = hospitalId;
        this.verified = verified;
    }

    private Date DateConvert(String str) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
            Date date = formatter.parse(str.replaceAll("Z$", "+0000"));
            return date;
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException();
        }
    }


    public String toString() {
        return "Id:"+id+", Date:"+date+", hospital:"+hospitalId+", verified:"+verified;
    }

}
