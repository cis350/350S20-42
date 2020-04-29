package edu.upenn.cis350.hw4;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;

import edu.upenn.cis350.hw4.data.Person;
import edu.upenn.cis350.hw4.data.DataTasks;
import edu.upenn.cis350.hw4.data.Appointment;

public class ProcedureSignupActivity extends AppCompatActivity {

    Person data;
    Appointment detail;
    EditText commentText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_procedure_signup);

        Intent i = getIntent();
        data = (Person)i.getSerializableExtra("data");
        detail = (Appointment)i.getSerializableExtra("detail");

        // Setting all the textviews on the page
        TextView dateText = (TextView)findViewById(R.id.dateText);
        dateText.setText("Date: " + detail.getDate());

        TextView doctorText = (TextView)findViewById(R.id.doctorText);
        doctorText.setText("Operating Staff Member: " + detail.getDoctor());

        TextView header = (TextView)findViewById(R.id.mainText);
        header.setText(detail.getHospital() + ": " + detail.getProcedure());

        commentText = (EditText)findViewById(R.id.edit_text);
    }

    public void sendClick(View v) {
        String comment = commentText.getText().toString();
        DataTasks.requestProcedure(data.getUsername(), comment, detail.getHospital(), detail.getProcedure());
        Intent i = new Intent(this, Options.class);
        i.putExtra("data", data);
        startActivity(i);
    }

}