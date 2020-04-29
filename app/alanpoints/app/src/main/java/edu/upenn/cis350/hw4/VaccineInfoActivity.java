package edu.upenn.cis350.hw4;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.TextView;

import edu.upenn.cis350.hw4.data.VaccineInfo;

public class VaccineInfoActivity extends AppCompatActivity {

    TextView vaccineText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_vaccine_info);
        vaccineText = (TextView) findViewById(R.id.vaccineText);

        Intent i = getIntent();
        VaccineInfo vaccineInfo = (VaccineInfo)i.getSerializableExtra("vaccine");

        vaccineText.setText(vaccineInfo.toString()+'\n'+vaccineInfo.getInfo());

    }
}
