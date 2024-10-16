<?php

namespace YourVendor\LaravelJsPackage;

use Illuminate\Support\ServiceProvider;

class YourPackageServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Publish the JavaScript assets
        $this->publishes([
            __DIR__.'/js/client' => public_path('js/client'),
            __DIR__.'/js/main' => public_path('js/main'),
            __DIR__.'/init.js' => public_path('js/init.js'),
        ], 'js-assets');
    }

    public function register()
    {
        // Register any bindings or services here if needed
    }
}
