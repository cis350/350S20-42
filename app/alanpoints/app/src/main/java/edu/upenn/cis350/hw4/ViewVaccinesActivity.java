package edu.upenn.cis350.hw4;

import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;

import edu.upenn.cis350.hw4.data.DataTasks;
import edu.upenn.cis350.hw4.data.Person;
import edu.upenn.cis350.hw4.data.Vaccine;

public class ViewVaccinesActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_vaccine);

        final ListView listview = (ListView) findViewById(R.id.listview);

        Intent intent = getIntent();
        Person data = (Person) intent.getSerializableExtra("data");

        data = DataTasks.loginCheck(data);
        Vaccine[] values = data.getVaccines();
        final ArrayList<String> list = new ArrayList<String>();
        for (int i = 0; i < values.length; ++i) {
            list.add(values[i].toString());
        }
        final ArrayAdapter adapter = new ArrayAdapter(this,
                android.R.layout.simple_list_item_1, list);
        listview.setAdapter(adapter);



    }

    public void backClick(View v) {
        finish();
    }

}
