package edu.upenn.cis350.hw4;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;

import edu.upenn.cis350.hw4.data.Person;
import edu.upenn.cis350.hw4.data.DataTasks;
import edu.upenn.cis350.hw4.data.Appointment;

public class SelectHospitalActivity extends AppCompatActivity {

    Person data;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_appointment_search);

        Intent i = getIntent();
        data = (Person)i.getSerializableExtra("data");

        TextView title = (TextView)findViewById(R.id.myTitle);
        title.setText("Select Hospital");

        LinearLayout myLayout = (LinearLayout) findViewById(R.id.myLayout);

        LinearLayout.LayoutParams myParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        );

        String[] potential = DataTasks.acquireHospitals();

        for (int j = 0; j < potential.length; j++) {
            System.out.println(potential[j]);
            final String curr = potential[j];

            final Intent r = new Intent(this, AppSearchSomeActivity.class);
            r.putExtra("data", data);
            r.putExtra("hospital", curr);

            Button newButton = new Button(SelectHospitalActivity.this);
            newButton.setText(curr);
            newButton.setId(j);

            newButton.setOnClickListener( new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    startActivity(r);
                }
            });

            myLayout.addView(newButton, myParams);

        }
    }

}
