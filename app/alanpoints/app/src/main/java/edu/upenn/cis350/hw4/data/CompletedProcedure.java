package edu.upenn.cis350.hw4.data;

import java.io.Serializable;

public class CompletedProcedure implements Serializable {
    private String username;
    private String hospital;
    private String doctor;
    private String procedure;

    public CompletedProcedure(String username, String hospital, String doctor, String procedure) {
        this.username = username;
        this.hospital = hospital;
        this.doctor = doctor;
        this.procedure = procedure;
    }

    public String getUsername() {
        return username;
    }

    public String getHospital() {
        return hospital;
    }

    public String getDoctor() {
        return doctor;
    }

    public String getProcedure() {
        return procedure;
    }

}
