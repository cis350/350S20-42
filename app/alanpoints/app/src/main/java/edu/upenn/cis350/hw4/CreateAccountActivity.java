package edu.upenn.cis350.hw4;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import java.net.URL;

import edu.upenn.cis350.hw4.data.DataTasks;

public class CreateAccountActivity extends AppCompatActivity {

    EditText usernameText;
    EditText passwordText;
    EditText fullNameText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_account);
        usernameText = findViewById(R.id.usernameText);
        passwordText = findViewById(R.id.passwordText);
        fullNameText = findViewById(R.id.fullNameText);
    }

    public void addClick(View v) {
        String username = usernameText.getText().toString();
        String password = passwordText.getText().toString();
        String fullName = fullNameText.getText().toString();

        DataTasks.createLogin(username, password, fullName);

        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);

    }
}
