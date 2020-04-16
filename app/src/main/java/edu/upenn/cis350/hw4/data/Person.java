package edu.upenn.cis350.hw4.data;

import java.io.Serializable;

public class Person implements Serializable {
    String username;
    String password;
    Object image;
    Vaccine[] vaccines;
    String fullName = "default";

    public Person(String user, String pass) {
        this.username = user;
        this.password = pass;
        //vaccines = vac;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }

    public String getUserame() {
        return username;
    }

    public String getPassword() {
        return password;
    }

}
