package com.aphlo.minwari

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugins.googlemobileads.GoogleMobileAdsPlugin

class MainActivity : FlutterActivity() {
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        val gridNativeLightFactory = GridNativeAdLightFactory(context)
        GoogleMobileAdsPlugin.registerNativeAdFactory(flutterEngine, "gridLight", gridNativeLightFactory)

    }

    override fun cleanUpFlutterEngine(flutterEngine: FlutterEngine) {
        super.cleanUpFlutterEngine(flutterEngine)
        
        // Factoryを登録解除
        GoogleMobileAdsPlugin.unregisterNativeAdFactory(flutterEngine, "gridLight")

    }
}
