package edu.upenn.cis350.hw4;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import edu.upenn.cis350.hw4.ui.login.LoginActivity;


public class MainActivity extends AppCompatActivity implements AdapterView.OnItemSelectedListener {


    String[] mainOptions = {"Easy", "Medium", "Hard"};
    int currentOption = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Spinner spin = (Spinner) findViewById(R.id.spinner);
        spin.setOnItemSelectedListener(this);
        ArrayAdapter aa = new ArrayAdapter(this, android.R.layout.simple_spinner_item, mainOptions);
        aa.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spin.setAdapter(aa);
    }

    @Override
    public void onItemSelected(AdapterView<?> arg0, View arg1, int position, long id) {
        Toast.makeText(getApplicationContext(), mainOptions[position], Toast.LENGTH_LONG).show();
        currentOption = position;

    }

    @Override
    public void onNothingSelected(AdapterView<?> arg0) {
        // TODO Auto-generated method stub

    }

    public void buttonClick(View v) {
        System.out.println("nn");
        Intent i = new Intent(this, LoginActivity.class);
        i.putExtra("option", currentOption);
        startActivity(i);
    }


}
