package edu.upenn.cis350.hw4;

import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.view.View;

import edu.upenn.cis350.hw4.data.Person;

public class Options extends AppCompatActivity {

    Person data;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_options);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });



        Intent i = getIntent();
        data = (Person)i.getSerializableExtra("data");



    }

    public void addVaccineClick(View v) {
        System.out.println("nn");
        Intent i = new Intent(this, AddOneVaccine.class);
        i.putExtra("data", data);
        startActivity(i);

    }

    public void viewVaccinesClick(View v) {
        System.out.println("nn");
        Intent i = new Intent(this, ViewVaccinesActivity.class);
        i.putExtra("data", data);
        startActivity(i);

    }

    public void addImageClick(View v) {
        System.out.println("nn");
        Intent i = new Intent(this, AddOneVaccine.class);
        i.putExtra("data", data);
        startActivity(i);

    }

    public void appointmentClick(View v) {
        System.out.println("HEHEHE");
        Intent i = new Intent(this, AppSearchActivity.class);
        i.putExtra("data", data);
        startActivity(i);
    }

    public void backClick(View v) {
        System.out.println("nn");
        finish();

    }


}
