package com.tierlistmaker;

import com.facebook.react.ReactActivity;
import android.os.Bundle; // import this

public class MainActivity extends ReactActivity {

    // create this 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "TierListMaker";
    }
}
