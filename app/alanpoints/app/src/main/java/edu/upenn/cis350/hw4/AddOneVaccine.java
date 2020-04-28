package edu.upenn.cis350.hw4;

import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.view.View;
import android.widget.EditText;

import java.net.URL;

import edu.upenn.cis350.hw4.data.Person;

public class AddOneVaccine extends AppCompatActivity {


    EditText idText;
    EditText dateText;
    EditText hospitalText;
    Person data;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_one_vaccine);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        /*
        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
        */
        Intent i = getIntent();
        data = (Person)i.getSerializableExtra("data");

        idText = findViewById(R.id.idText);
        dateText = findViewById(R.id.dateText);
        hospitalText = findViewById(R.id.hospitalText);



    }

    public void addClick(View v) {

        try {
            String[] strArr = {data.getUsername(), data.getPassword(),
                    idText.getText().toString(), dateText.getText().toString(),
                    hospitalText.getText().toString()};
            URL url = new URL("http://10.0.2.2:3000/addVaccine?username="+strArr[0]+
                    "&password="+strArr[1]+"&vId="+strArr[2]+"&vDate="+strArr[3]+
                    "&hId="+strArr[4]);
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
