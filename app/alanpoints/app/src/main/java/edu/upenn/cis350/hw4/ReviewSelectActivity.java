package edu.upenn.cis350.hw4;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import edu.upenn.cis350.hw4.data.Person;

public class ReviewSelectActivity extends AppCompatActivity {
    Person data;
    String hospital;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_review_select);

        Intent i = getIntent();
        data = (Person) i.getSerializableExtra("data");
        hospital = (String) i.getSerializableExtra("hospital");

        TextView title = (TextView)findViewById(R.id.titleText);
        title.setText("Select Action For "+hospital);

    }

    public void viewClick(View v) {
        System.out.println("VIEW");
        Intent i = new Intent(this, PersonForReviewActivity.class);
        i.putExtra("data", data);
        i.putExtra("hospital", hospital);
        startActivity(i);
    }

    public void writeClick(View v) {
        System.out.println("WRITE");
        Intent i = new Intent(this, WriteReviewActivity.class);
        i.putExtra("data", data);
        i.putExtra("hospital", hospital);
        startActivity(i);
    }

}
