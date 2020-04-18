package edu.upenn.cis350.hw4.data;

import java.io.Serializable;
import java.util.Date;

public class Person implements Serializable {
    String username;
    String password;
    Object image;
    Vaccine[] vaccines;
    String fullName = "default";
    String email;
    String blood;
    Date dob;

    public Person(String user, String pass) {
        this.username = user;
        this.password = pass;
        //vaccines = vac;
    }

    public void setVaccines(Vaccine[] vaccines) {
        this.vaccines = vaccines;
    }

    public Vaccine[] getVaccines() {
        return vaccines;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Date getDob() {
        return dob;
    }

    public Object getImage() {
        return image;
    }

    public String getBlood() {
        return blood;
    }

    public String getEmail() {
        return email;
    }

    public void setBlood(String blood) {
        this.blood = blood;
    }

    public void setDob(String dob) {
        this.dob = DataTasks.DateConvert(dob);
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setImage(Object image) {
        this.image = image;
    }
}
