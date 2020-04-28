package edu.upenn.cis350.hw4.data;

import java.io.Serializable;

public class VaccineInfo implements Serializable {
    String id;
    String name;
    String info;


    public VaccineInfo(String id, String name, String info) {
        this.id = id;
        this.name = name;
        this.info = info;
    }

    public String getInfo() {
        return info;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String toString() {
        return "Id:"+id+", Name:"+name;
    }
}