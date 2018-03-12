package com.babyplan;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.beefe.picker.PickerViewPackage;
import com.wix.interactable.Interactable;
import com.github.xfumihiro.react_native_image_to_base64.ImageToBase64Package;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactlibrary.RNImgToBase64Package;
import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.beefe.picker.PickerViewPackage;
import com.wix.interactable.Interactable;
import com.github.xfumihiro.react_native_image_to_base64.ImageToBase64Package;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactlibrary.RNImgToBase64Package;
import com.beefe.picker.PickerViewPackage;
import com.github.xfumihiro.react_native_image_to_base64.ImageToBase64Package;
import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.wix.interactable.Interactable;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactlibrary.RNImgToBase64Package;
import com.reactlibrary.RNImgToBase64Package;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.wix.interactable.Interactable;
import com.wix.interactable.Interactable;
import com.oblador.vectoricons.VectorIconsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RealmReactPackage(),
            new VectorIconsPackage(),
            new PickerViewPackage(),
            new Interactable(),
            new ImageToBase64Package(),
            new PickerPackage(),
            new RNImgToBase64Package(),
            new RealmReactPackage(),
            new VectorIconsPackage(),
            new PickerViewPackage(),
            new Interactable(),
            new ImageToBase64Package(),
            new PickerPackage(),
            new RNImgToBase64Package(),
            new PickerViewPackage(),
            new ImageToBase64Package(),
            new RealmReactPackage(),
            new VectorIconsPackage(),
            new Interactable(),
            new PickerPackage(),
            new RNImgToBase64Package(),
            new RNImgToBase64Package(),
            new PickerPackage(),
            new RealmReactPackage(),
            new VectorIconsPackage(),
            new Interactable(),
            new Interactable(),
            new VectorIconsPackage(),
            new VectorIconsPackage(),
            new VectorIconsPackage(),
            new VectorIconsPackage()
      );
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
