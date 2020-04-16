package edu.upenn.cis350.hw4.data;


//has fields for sending AccessWebTask called by DataSource

import java.net.URL;

public class LoginWebData {
    String username;
    String password;
    URL url;


    public URL getUrl() {
        return url;
    }
}