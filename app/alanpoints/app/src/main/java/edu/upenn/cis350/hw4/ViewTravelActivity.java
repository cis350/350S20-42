package edu.upenn.cis350.hw4;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

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
        init();
    }
        void init() {
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

    protected void onResume() {
        super.onResume();
        init();
    }

    public void addClick(View v) {
        Intent i = new Intent(this, AddTravelActivity.class);
        i.putExtra("data", data);
        startActivity(i);
    }

    public void recClick(View v)
    {
        final ListView listRecView = (ListView) findViewById(R.id.listRecView);
        Travel[] values = data.getTravels();
        final Set<String> set = new HashSet<String>();
        for (int i = 0; i < values.length; ++i) {
            String to_check = values[i].getCountry().toLowerCase();
            if (to_check.equals("pakistan")) {
                set.add("Tuberculosis");
                set.add("Dengue");
            } else if (to_check.equals("zimbabwe")) {
                set.add("Aids");

            } else if (to_check.equals("india")) {
                set.add("Malaria");
                set.add("Tuberculosis");
            }
        }
        List<String> list = new LinkedList<>();
        list.addAll(set);
        final ArrayAdapter adapter = new ArrayAdapter(this,
                android.R.layout.simple_list_item_1, list);
        listRecView.setAdapter(adapter);

    }

    public void backClick(View v) {
finish();

    }

}