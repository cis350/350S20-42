package edu.upenn.cis350.hw4;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;

import edu.upenn.cis350.hw4.data.Person;
import edu.upenn.cis350.hw4.data.DataTasks;
import edu.upenn.cis350.hw4.data.Appointment;

public class AppSearchSomeActivity extends AppCompatActivity {

    Person data;
    String hospital;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_appointment_search);

        Intent i = getIntent();
        data = (Person)i.getSerializableExtra("data");
        hospital = (String)i.getSerializableExtra("hospital");

        LinearLayout myLayout = (LinearLayout) findViewById(R.id.myLayout);

        LinearLayout.LayoutParams myParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        );

        Appointment[] potential = DataTasks.acquireProcedures(hospital);

        for (int j = 0; j < potential.length; j++) {
            System.out.println(potential[j].getDoctor());

            Appointment curr = potential[j];
            final String hosName = potential[j].getHospital();
            final String procedure = potential[j].getProcedure();

            final Intent r = new Intent(this, ProcedureSignupActivity.class);
            r.putExtra("data", data);
            r.putExtra("detail", curr);

            Button newButton = new Button(AppSearchSomeActivity.this);
            newButton.setText(hosName + ": " + procedure);
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
