package edu.upenn.cis350.hw4.data;

import java.io.Serializable;

public class Appointment implements Serializable {

    private String doctor;
    private String hospital;
    private String date;
    private String procedure;

    public Appointment(String doctor, String hospital, String date, String procedure) {
        this.doctor = doctor;
        this.hospital = hospital;
        this.date = date;
        this.procedure = procedure;
    }

    public String getDoctor() {
        return doctor;
    }

    public String getHospital() {
        return hospital;
    }

    public String getDate() {
        return date;
    }

    public String getProcedure() {
        return procedure;
    }

}
