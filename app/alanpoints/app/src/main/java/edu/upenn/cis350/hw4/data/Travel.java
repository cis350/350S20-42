package edu.upenn.cis350.hw4.data;

import java.io.Serializable;
import java.util.Date;

public class Travel implements Serializable {
    String country;
    Date start;

    Date end;

    public Travel(String country, Date start, Date end) {
        this.country = country;
        this.start = start;
        this.end = end;
    }

    public Travel(String country, String start, String end) {
        this.country = country;
        this.start = DataTasks.DateConvert(start);
        this.end = DataTasks.DateConvert(end);
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public String toString() {
        return "Country: "+country+", Start: "+start+", End: "+end;

    }
}
