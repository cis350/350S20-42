package edu.upenn.cis350.hw4;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import org.json.simple.JSONObject;

import java.net.URL;

import edu.upenn.cis350.hw4.data.AccessWebTask;
import edu.upenn.cis350.hw4.data.Person;

public class ViewInfoActivity extends AppCompatActivity {
    Person data;
    TextView usernameText;
    EditText fullNameText;
    EditText emailText;
    EditText bloodText;
    EditText dobText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_info);
        Intent i = getIntent();
        data = (Person) i.getSerializableExtra("data");

        usernameText = (TextView)findViewById(R.id.usernameText);
        fullNameText = (EditText)findViewById(R.id.fullNameText);
        emailText = (EditText)findViewById(R.id.emailText);
        bloodText = (EditText)findViewById(R.id.bloodText);
        dobText = (EditText)findViewById(R.id.dobText);


        if (data.getUsername().length() != 0) {
            usernameText.setText(data.getUsername());
        }
    }

    void addClick(View v){

        String username = data.getUsername();
        String fullName = fullNameText.getText().toString();
        String email = emailText.getText().toString();
        String blood = bloodText.getText().toString();
        String dob = dobText.getText().toString();
        String password = data.getPassword();

        URL[] urls = new URL[1];
        try {
            urls[0] = new URL("http://10.0.2.2:3000/editInfo?username=" + username +
                    "&password=" + password + "&fullName=" + fullName + "&email=" + email +
                    "&blood=" + blood + "&dob=" + dob);
            AccessWebTask task = new AccessWebTask();
            task.execute();
            data = task.get()[0];
        } catch (Exception e){
            throw new UnsupportedOperationException();
        }
    }

    void backClick(View v){
        finish();
    }


}
