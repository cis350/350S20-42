package edu.upenn.cis350.hw4;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import java.net.URL;

import edu.upenn.cis350.hw4.data.Person;

public class AddTravelActivity extends AppCompatActivity {

    Person data;
    EditText countryText;
    EditText startText;
    EditText endText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_travel);
        Intent i = getIntent();
        data = (Person)i.getSerializableExtra("data");

        countryText = findViewById(R.id.countryText);
        startText = findViewById(R.id.startText);
        endText = findViewById(R.id.endText);



    }

    public void addClick(View v) {

        try {
            String[] strArr = {data.getUsername(), data.getPassword(),
                    countryText.getText().toString(), startText.getText().toString(),
                    endText.getText().toString()};
            URL url = new URL("http://10.0.2.2:3000/addTravel?username="+strArr[0]+
                    "&password="+strArr[1]+"&country="+strArr[2]+"&start="+strArr[3]+
                    "&end="+strArr[4]);
            URL[] inputs = new URL[1];
            inputs[0] = url;
            AccessWebAddVaccine task = new AccessWebAddVaccine();
            task.execute(inputs);
            task.get();
            finish();
        } catch (Exception e) {
            throw new UnsupportedOperationException();
        }

    }



}
