package edu.upenn.cis350.hw4;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

import edu.upenn.cis350.hw4.data.DataTasks;
import edu.upenn.cis350.hw4.data.Person;

public class WriteReviewActivity extends AppCompatActivity {
    Person data;
    String hospital;
    EditText reviewText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_write_review);

        Intent i = getIntent();
        data = (Person) i.getSerializableExtra("data");
        hospital = (String) i.getSerializableExtra("hospital");

        reviewText = (EditText)findViewById(R.id.edit_text);
    }

    public void sendClick(View v) {
        String comment = reviewText.getText().toString();
        DataTasks.createReview(data.getUsername(), hospital, comment);
        Intent i = new Intent(this, Options.class);
        i.putExtra("data", data);
        startActivity(i);
    }

}
