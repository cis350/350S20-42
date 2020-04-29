package edu.upenn.cis350.hw4;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import edu.upenn.cis350.hw4.data.Person;
import edu.upenn.cis350.hw4.data.Review;
import edu.upenn.cis350.hw4.data.CompletedProcedure;
import edu.upenn.cis350.hw4.data.DataTasks;

public class ReadReviewActivity extends AppCompatActivity {

    Person data;
    Review review;
    String hospital;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_read_review);

        Intent i = getIntent();
        data = (Person) i.getSerializableExtra("data");
        hospital = (String) i.getSerializableExtra("hospital");
        review = (Review) i.getSerializableExtra("review");

        TextView hosText = (TextView)findViewById(R.id.hospitalText);
        TextView writerText = (TextView)findViewById(R.id.writerText);
        TextView reviewText = (TextView)findViewById(R.id.reviewText);

        hosText.setText("Hospital: "+hospital);
        writerText.setText("Writer Username: "+review.getUsername());
        reviewText.setText("Review: "+review.getReview());

        LinearLayout myLayout = (LinearLayout) findViewById(R.id.myLayout);

        LinearLayout.LayoutParams myParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        );

        CompletedProcedure[] all = DataTasks.acquireCompleted(review.getUsername(), hospital);

        if (all.length == 0) {
            TextView newText = new TextView(ReadReviewActivity.this);
            newText.setText("None on record");
            myLayout.addView(newText, myParams);
        }

        for (int j = 0; j < all.length; j++) {
            CompletedProcedure curr = all[j];

            TextView newText = new TextView(ReadReviewActivity.this);
            newText.setText("Worked with "+curr.getDoctor() + " for "+curr.getProcedure());
            myLayout.addView(newText, myParams);
        }
    }

    public void reviewClick(View v) {
        System.out.println("Review");
        Intent i = new Intent(this, PersonForReviewActivity.class);
        i.putExtra("data", data);
        i.putExtra("hospital", hospital);
        startActivity(i);
    }

    public void backClick(View v) {
        System.out.println("Back");
        Intent i = new Intent(this, Options.class);
        i.putExtra("data", data);
        startActivity(i);
    }
}