package edu.upenn.cis350.hw4;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import java.net.URL;

import edu.upenn.cis350.hw4.data.Person;

public class CreateAccountActivity extends AppCompatActivity {

    EditText usernameText;
    EditText passwordText;
    EditText fullNameText;
    Person data;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create_account);
        Intent i = getIntent();
        data = (Person)i.getSerializableExtra("data");

        usernameText = findViewById(R.id.usernameText);
        passwordText = findViewById(R.id.passwordText);
        fullNameText = findViewById(R.id.fullNameText);



    }

    public void addClick(View v) {

        try {
            String[] strArr = {usernameText.getText().toString(), passwordText.getText().toString(),
                    fullNameText.getText().toString()};
            URL url = new URL("http:///10.0.2.2:3000/create?username="+strArr[0]+
                    "&password="+strArr[1]+"&fullName="+strArr[2]);
            URL[] inputs = new URL[1];
            inputs[0] = url;
            AccessWebRunURL task = new AccessWebRunURL();
            task.execute(inputs);
            task.get();
        } catch (Exception e) {
            throw new UnsupportedOperationException();
        }
        finish();
    }



}
