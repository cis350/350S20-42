package edu.upenn.cis350.hw4.ui.login;

import androidx.annotation.Nullable;

/**
 * Authentication result : success (user details) or error message.
 */
class LoginResult {
    @Nullable
    private LoggedInUserView success;
    @Nullable
    private Integer error;

    LoginResult(@Nullable Integer error) {
        System.out.println(error);
        this.error = error;
    }

    LoginResult(@Nullable LoggedInUserView success) {
        System.out.println(success);
        this.success = success;
    }

    @Nullable
    LoggedInUserView getSuccess() {
        System.out.println("efjfj"+success);
        return success;
    }

    @Nullable
    Integer getError() {
        return error;
    }


}
