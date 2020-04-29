package edu.upenn.cis350.hw4;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

import edu.upenn.cis350.hw4.data.Person;

public class AppSearchActivity extends AppCompatActivity {

    Person data;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_appointment_type);

        Intent i = getIntent();
        data = (Person)i.getSerializableExtra("data");
    }

    public void allSearchClick(View v) {
        System.out.println("ALL");
        Intent i = new Intent(this, AppSearchAllActivity.class);
        i.putExtra("data", data);
        startActivity(i);
    }

    public void specificSearchClick(View v) {
        System.out.println("WHICH ONE");
        Intent i = new Intent(this, SelectHospitalActivity.class);
        i.putExtra("data", data);
        startActivity(i);
    }

}
