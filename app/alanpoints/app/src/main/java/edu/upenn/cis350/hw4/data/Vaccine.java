package edu.upenn.cis350.hw4.data;


import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Vaccine implements Serializable {
    String id;
    Date date;
    String hospitalId;
    Boolean verified;
    public final static int idLength = 4;

    public Vaccine(String id, String date, String hospitalId, Boolean verified) {
        this.id = id;
        this.date = DataTasks.DateConvert(date);
        this.hospitalId = hospitalId;
        this.verified = verified;
    }




    public String toString() {
        return "Id:"+id+", Date:"+date+", hospital:"+hospitalId+", verified:"+verified;
    }

}
