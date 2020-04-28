package edu.upenn.cis350.hw4;

import edu.upenn.cis350.hw4.data.Person;

public class CurrentPerson {

    private static Person data;

    public static Person getPerson() {
        return data;
    }

    public static void setPerson(Person d) {
        data = d;
    }
}
