package edu.upenn.cis350.hw4;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import java.net.URL;

import edu.upenn.cis350.hw4.data.AccessWebTask;
import edu.upenn.cis350.hw4.data.Person;

public class Login2Activity extends AppCompatActivity {

    EditText usernameText;
    EditText passwordText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login2);
        usernameText = findViewById(R.id.usernameText);
        passwordText = findViewById(R.id.passwordText);



    }

    public void addClick(View v) {

        try {
            String[] strArr = {usernameText.getText().toString(), passwordText.getText().toString()};

            AccessWebTask task = new AccessWebTask();
            task.execute(strArr);
            Person[] dataArray = task.get();
            Person data;
            if (dataArray != null) {
                data = dataArray[0];
                String welcome = getString(R.string.welcome) + data.getFullName();
                Toast.makeText(getApplicationContext(), welcome, Toast.LENGTH_SHORT).show();
                System.out.println("nn");
                Intent i = new Intent(this, Options.class);
                i.putExtra("data", data);
                startActivity(i);
            }
            Toast.makeText(getApplicationContext(), "Login Failed", Toast.LENGTH_SHORT).show();

        } catch (Exception e) {
            throw new UnsupportedOperationException();
        }
        finish();
    }



}

