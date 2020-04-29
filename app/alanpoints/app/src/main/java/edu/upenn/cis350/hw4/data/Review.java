package edu.upenn.cis350.hw4.data;

import java.io.Serializable;

public class Review implements Serializable {
    private String username;
    private String hospital;
    private String review;

    public Review(String username, String hospital, String review) {
        this.username = username;
        this.hospital = hospital;
        this.review = review;
    }

    public String getUsername() {
        return username;
    }

    public String getDoctor() {
        return hospital;
    }

    public String getReview() {
        return review;
    }
}
