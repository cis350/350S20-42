package edu.upenn.cis350.hw4;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import edu.upenn.cis350.hw4.data.Person;
import edu.upenn.cis350.hw4.data.AccessWebTask;
import edu.upenn.cis350.hw4.data.DataTasks;

public class Login2Activity extends AppCompatActivity {

    EditText usernameText;
    EditText passwordText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        System.out.println("???");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login2);
        usernameText = findViewById(R.id.usernameText);
        passwordText = findViewById(R.id.passwordText);

    }

    public void addClick(View v) {

        String username = usernameText.getText().toString();
        String password = passwordText.getText().toString();
        String [] strArray = {username, password};

        Person curr = DataTasks.loginCheck(strArray);

        if (curr != null) {
            String welcome = getString(R.string.welcome) + curr.getFullName();
            Toast.makeText(getApplicationContext(), welcome, Toast.LENGTH_SHORT).show();
            System.out.println("nn");
            Intent i = new Intent(this, Options.class);
            i.putExtra("data", curr);
            startActivity(i);
        } else {
            Toast.makeText(getApplicationContext(), "Login Failed", Toast.LENGTH_SHORT).show();
        }

        finish();

    }

}

