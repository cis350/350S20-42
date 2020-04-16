package edu.upenn.cis350.hw4.ui.login;

import edu.upenn.cis350.hw4.data.Person;

/**
 * Class exposing authenticated user details to the UI.
 */
class LoggedInUserView {
    private Person data;
    //... other data fields that may be accessible to the UI

    LoggedInUserView(Person data) {
        this.data = data;
    }

    Person getData() {
        return data;
    }
}
