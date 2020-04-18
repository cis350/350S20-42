package edu.upenn.cis350.hw4;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void loginClick(View v) {
        System.out.println("nn");
        Intent i = new Intent(this, Login2Activity.class);
        startActivity(i);
    }

    public void createClick(View v) {
        System.out.println("nn");
        Intent i = new Intent(this, CreateAccountActivity.class);
        startActivity(i);
    }

}
