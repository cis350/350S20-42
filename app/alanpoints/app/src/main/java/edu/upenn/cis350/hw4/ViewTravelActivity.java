package edu.upenn.cis350.hw4;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;

import edu.upenn.cis350.hw4.data.DataTasks;
import edu.upenn.cis350.hw4.data.Person;
import edu.upenn.cis350.hw4.data.Travel;
import edu.upenn.cis350.hw4.data.Vaccine;

public class ViewTravelActivity extends AppCompatActivity {

    Person data;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_travel);

        final ListView listView = (ListView) findViewById(R.id.listView);

        Intent intent = getIntent();
        data = (Person) intent.getSerializableExtra("data");

        data = DataTasks.loginCheck(data);
        Travel[] values = data.getTravels();
        final ArrayList<String> list = new ArrayList<String>();
        for (int i = 0; i < values.length; ++i) {
            list.add(values[i].toString());
        }
        final ArrayAdapter adapter = new ArrayAdapter(this,
                android.R.layout.simple_list_item_1, list);
        listView.setAdapter(adapter);




    }

    public void addClick(View v) {
        Intent i = new Intent(this, AddTravelActivity.class);
        i.putExtra("data", data);
        startActivity(i);
        recreate();
    }

    public void recClick(View v)
    {

    }

    public void backClick(View v) {
finish();

    }

}