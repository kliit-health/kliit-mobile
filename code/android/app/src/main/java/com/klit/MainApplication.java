package com.klit;

import android.annotation.SuppressLint;
import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import java.util.List;

import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;


public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @SuppressLint("MissingPermission")
        @Override
        protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // Packages that cannot be autolinked yet can be added manually here, for example:
            packages.add(new RNFirebasePackage());
            packages.add(new RNFirebaseAuthPackage());
            packages.add(new RNFirebaseStoragePackage());
            packages.add(new RNFirebaseFirestorePackage());
            packages.add(new RNFirebaseDatabasePackage());
            packages.add(new RNFirebaseNotificationsPackage());
            packages.add(new RNFirebaseMessagingPackage());
      packages.add(new RNFirebaseRemoteConfigPackage());
            packages.add(new AsyncStoragePackage());
            packages.add(new ImagePickerPackage());
            packages.add(new RNGestureHandlerPackage());
            packages.add(new RCTSplashScreenPackage());
            packages.add(new BackgroundTimerPackage());

            return packages;
        }


        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
