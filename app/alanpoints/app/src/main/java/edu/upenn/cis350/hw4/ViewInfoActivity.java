package edu.upenn.cis350.hw4;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import java.net.URL;
import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import edu.upenn.cis350.hw4.data.AccessWebTask;
import edu.upenn.cis350.hw4.data.Person;
import edu.upenn.cis350.hw4.data.DataTasks;

public class ViewInfoActivity extends AppCompatActivity {
    Person data;
    TextView usernameText;
    EditText fullNameText;
    EditText emailText;
    EditText bloodText;
    EditText dobText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_info);
        Intent i = getIntent();
        data = (Person) i.getSerializableExtra("data");
        data = DataTasks.loginCheck(data);

        usernameText = (TextView)findViewById(R.id.usernameText);
        fullNameText = (EditText)findViewById(R.id.fullNameText);
        emailText = (EditText)findViewById(R.id.emailText);
        bloodText = (EditText)findViewById(R.id.bloodText);
        dobText = (EditText)findViewById(R.id.dobText);


        if (data.getUsername() != null && data.getUsername().length() > 0) {
            usernameText.setText(data.getUsername());
        }

        if (data.getFullName() != null && data.getFullName().length() > 0) {
            fullNameText.setText(data.getFullName());
        }

        if (data.getBlood() != null && data.getBlood().length() > 0) {
            bloodText.setText(data.getBlood());
        }

        if (data.getEmail() != null && data.getEmail().length() > 0) {
            emailText.setText(data.getEmail());
        }

        if (data.getDob() != null) {
            Date date = data.getDob();
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String strDate = dateFormat.format(date);
            dobText.setText(strDate);
        }
    }

    public void addClick(View v){
        System.out.println("Testingg");
        String username = data.getUsername();
        String fullName = fullNameText.getText().toString();
        String email = emailText.getText().toString();
        String blood = bloodText.getText().toString();
        String dob = dobText.getText().toString();
        String password = data.getPassword();

        URL[] urls = new URL[1];
        try {
            urls[0] = new URL("http://10.0.2.2:3000/editInfo?username=" + username +
                    "&password=" + password + "&fullName=" + fullName + "&email=" + email +
                    "&blood=" + blood + "&dob=" + dob);
            AccessWebAddVaccine task = new AccessWebAddVaccine();
            task.execute(urls);
            task.get();


        } catch (Exception e){
            throw new UnsupportedOperationException();
        }
    }

    public void backClick(View v){
        System.out.println("Here?");
        finish();
    }


}
