package edu.upenn.cis350.hw4;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;

import edu.upenn.cis350.hw4.data.DataTasks;
import edu.upenn.cis350.hw4.data.Person;
import edu.upenn.cis350.hw4.data.Vaccine;
import edu.upenn.cis350.hw4.data.VaccineInfo;

public class AllVaccinesActivity extends AppCompatActivity {



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_all_vaccines);
        final ListView listview = (ListView) findViewById(R.id.listview);

        VaccineInfo[] values = DataTasks.getVaccineInfo();

        final ArrayList<VaccineInfo> list = new ArrayList<VaccineInfo>();
        for (int i = 0; i < values.length; ++i) {
            list.add(values[i]);
        }
        final ArrayAdapter adapter = new ArrayAdapter(this,
                android.R.layout.simple_list_item_1, list);
        listview.setAdapter(adapter);
        listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int pos, long l) {
                VaccineInfo vaccineInfo = (VaccineInfo)adapterView.getItemAtPosition(pos);
                Intent intent = new Intent(getApplicationContext(), VaccineInfoActivity.class);
                intent.putExtra("vaccine", vaccineInfo);
                startActivity(intent);
            }
        });



    }

    public void backClick(View v) {
        finish();
    }

}
