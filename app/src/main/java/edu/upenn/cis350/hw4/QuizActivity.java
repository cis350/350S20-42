package edu.upenn.cis350.hw4;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import java.util.LinkedList;
import java.util.List;

public class QuizActivity extends AppCompatActivity {

    int first = 10;
    int second = 10;
    String result = "";
    int counter = 0;
    int subcounter = 0;
    boolean isFreeze = false;


    int[] easyInt1 = {11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47,
        49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89};
    int[] easyInt2 = {12, 32, 23, 21, 20, 20, 20, 20, 30, 50, 22, 32, 23, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 11, 10, 10, 30, 30, 30, 30, 20, 20, 20, 12, 10, 10, 10, 12, 11, 10};

    int[] mediInt1 = {11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47,
        49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89};
    int[] mediInt2 = {19, 38, 29, 28, 26, 29, 27, 28, 39, 59, 29, 39, 29, 19, 19, 19, 19, 19, 19,
        90, 91, 90, 90, 90, 90, 90, 90, 90, 90, 90, 19, 18, 19, 19, 19, 54, 60, 20, 20, 20};

    int[] hardInt1 = {11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47,
        49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89};
    int[] hardInt2 = {99, 98, 99, 98, 86, 99, 77, 98, 99, 89, 79, 89, 89, 89, 89, 89, 89, 89, 89,
        93, 99, 98, 97, 96, 92, 99, 98, 98, 98, 97, 39, 58, 59, 79, 49, 59, 68, 37, 44, 23};

    int len = easyInt1.length;

    int currentOption = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quiz);
        currentOption = (int) getIntent().getIntExtra("option", 0);
        newQuestion(currentOption);
    }

    private void insertDigit(int digit) {
        if (isFreeze) {
            return;
        }
        TextView answerView = (TextView) findViewById(R.id.answer);
        if (result.length() < 3) {
            result = digit + result;
        }
        answerView.setText("  " + result);

    }

    private void newQuestion(int curr) {
        getNumbers(curr);
        TextView firstView = (TextView) findViewById(R.id.first);
        TextView secondView = (TextView) findViewById(R.id.second);
        firstView.setText("   " + first);
        secondView.setText("+ " + second);
        TextView answerView = (TextView) findViewById(R.id.answer);
        answerView.setText("    ?");
        result = "";


    }

    private void getNumbers(int currOpt) {
        List<Integer> already = new LinkedList<Integer>();

        boolean done = false;
        while (!done) {
            int random = (int) (Math.random() * (len));
            if (!already.contains(random)) {
                done = true;
                if (!already.isEmpty()) {
                    already.remove(0);
                }
                already.add(random);
                if (currOpt == 0) {
                    first = easyInt1[random];
                    second = easyInt2[random];
                } else if (currOpt == 1) {
                    first = mediInt1[random];
                    second = mediInt2[random];
                } else {
                    first = hardInt1[random];
                    second = hardInt2[random];
                }
            }
        }
    }

    public void submit(View v) {

        if (isFreeze) {
            return;
        }

        if (checkInt(result) && Integer.parseInt(result) == first + second) {
            counter++;
            subcounter = 0;
            String toastStr = "Correct! ";
            if (counter > 1) {
                toastStr = toastStr + counter + " in a row!";
            }
            Toast.makeText(getApplicationContext(), toastStr, Toast.LENGTH_LONG).show();
            new AsyncTask<String, String, String>() {

                // 3. Implement this method so that it waits for 3 seconds
                protected String doInBackground(String... inputs) {
                    isFreeze = true;
                    try {
                        Thread.sleep(3000);
                    } catch (Exception e) {
                    }
                    return null;
                }

                // 4. This method will be run after doInBackground finishes
                protected void onPostExecute(String input) {
                    isFreeze = false;
                    newQuestion(currentOption);
                }
            }.execute();

        } else {
            subcounter++;
            if (subcounter < 3) {
                Toast.makeText(getApplicationContext(), "Incorrect! Try again!",
                        Toast.LENGTH_LONG).show();

            } else {
                String toastStr = "Incorrect! The correct answer is " + (first + second);
                Toast.makeText(getApplicationContext(), toastStr, Toast.LENGTH_LONG).show();
                incorrect();
            }
            incorrect();
        }
    }

    private void incorrect() {

        new AsyncTask<String, String, String>() {

            // 3. Implement this method so that it waits for 3 seconds
            protected String doInBackground(String... inputs) {
                isFreeze = true;
                try {
                    Thread.sleep(3000);
                } catch (Exception e) {
                }
                return null;
            }

            // 4. This method will be run after doInBackground finishes
            protected void onPostExecute(String input) {
                isFreeze = false;
                if (subcounter == 0) {
                    TextView answerView = (TextView) findViewById(R.id.answer);
                    answerView.setTextColor(Color.BLUE);
                    newQuestion(currentOption);
                } else if (subcounter < 3) {
                    TextView answerView = (TextView) findViewById(R.id.answer);
                    answerView.setText("    ?");
                    result = "";
                } else if (subcounter == 3) {
                    TextView answerView = (TextView) findViewById(R.id.answer);
                    answerView.setText("  " + (first + second));
                    answerView.setTextColor(Color.RED);
                    result = "";
                    subcounter = 0;
                    counter = 0;
                }
            }
        }.execute();

    }

    public void clear(View v) {
        if (isFreeze) {
            return;
        }
        TextView answerView = (TextView) findViewById(R.id.answer);
        result = "";
        answerView.setText("  " + result);
    }

    private boolean checkInt(String s) {
        try {
            Integer.parseInt(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public void insert0(View v) {
        insertDigit(0);
    }

    public void insert1(View v) {
        insertDigit(1);
    }

    public void insert2(View v) {
        insertDigit(2);
    }

    public void insert3(View v) {
        insertDigit(3);
    }

    public void insert4(View v) {
        insertDigit(4);
    }

    public void insert5(View v) {
        insertDigit(5);
    }

    public void insert6(View v) {
        insertDigit(6);
    }

    public void insert7(View v) {
        insertDigit(7);
    }

    public void insert8(View v) {
        insertDigit(8);
    }

    public void insert9(View v) {
        insertDigit(9);
    }
}
