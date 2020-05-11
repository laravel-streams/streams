<?php

namespace App\Providers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;

/**
 * Class AppServiceProvider
 *
 * @link   http://pyrocms.com/
 * @author PyroCMS, Inc. <support@pyrocms.com>
 * @author Ryan Thompson <ryan@pyrocms.com>
 */
class AppServiceProvider extends ServiceProvider
{

    /**
     * Additional service providers.
     *
     * @var array
     */
    protected $providers = [];

    /**
     * Register any application services.
     */
    public function register()
    {
        /**
         * Register additional service
         * providers if they exist.
         */
        foreach ($this->providers as $provider) {
            if (class_exists($provider)) {
                $this->app->register($provider);
            }
        }

        $this->testStreams();
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        //
    }

    public function testStreams()
    {
        foreach (File::files(base_path('resources/streams')) as $file) {

            $data = file_get_contents($file->getPathname());

            $data;
        }
    }
}
