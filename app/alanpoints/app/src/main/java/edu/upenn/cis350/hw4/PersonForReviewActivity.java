package edu.upenn.cis350.hw4;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import edu.upenn.cis350.hw4.data.DataTasks;
import edu.upenn.cis350.hw4.data.Person;
import edu.upenn.cis350.hw4.data.Review;

public class PersonForReviewActivity extends AppCompatActivity {

    Person data;
    String hospital;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_appointment_search);

        Intent i = getIntent();
        data = (Person) i.getSerializableExtra("data");
        hospital = (String) i.getSerializableExtra("hospital");

        TextView title = (TextView)findViewById(R.id.myTitle);
        title.setText("Select User Review");

        LinearLayout myLayout = (LinearLayout) findViewById(R.id.myLayout);

        LinearLayout.LayoutParams myParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        );

        Review[] potential = DataTasks.acquireReviews(hospital);

        for (int j = 0; j < potential.length; j++) {
            System.out.println(potential[j]);
            Review curr = potential[j];

            final Intent r = new Intent(this, ReadReviewActivity.class);
            r.putExtra("data", data);
            r.putExtra("hospital", hospital);
            r.putExtra("review", curr);

            Button newButton = new Button(PersonForReviewActivity.this);
            newButton.setText(curr.getUsername());
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
