<?php namespace Anomaly\AcrchitectExtension;

use Anomaly\Streams\Platform\Addon\AddonServiceProvider;
use Illuminate\Routing\Router;

class AcrchitectExtensionServiceProvider extends AddonServiceProvider
{

    /**
     * Additional addon plugins.
     *
     * @type array|null
     */
    public $plugins = [];

    /**
     * The addon Artisan commands.
     *
     * @type array|null
     */
    public $commands = [];

    /**
     * The addon's scheduled commands.
     *
     * @type array|null
     */
    public $schedules = [];

    /**
     * The addon API routes.
     *
     * @type array|null
     */
    public $api = [];

    /**
     * The addon routes.
     *
     * @type array|null
     */
    public $routes = [];

    /**
     * The addon middleware.
     *
     * @type array|null
     */
    public $middleware = [
        //Anomaly\AcrchitectExtension\Http\Middleware\ExampleMiddleware::class
    ];

    /**
     * Addon group middleware.
     *
     * @var array
     */
    public $groupMiddleware = [
        //'web' => [
        //    Anomaly\AcrchitectExtension\Http\Middleware\ExampleMiddleware::class,
        //],
    ];

    /**
     * Addon route middleware.
     *
     * @type array|null
     */
    public $routeMiddleware = [];

    /**
     * The addon event listeners.
     *
     * @type array|null
     */
    public $listeners = [
        //Anomaly\AcrchitectExtension\Event\ExampleEvent::class => [
        //    Anomaly\AcrchitectExtension\Listener\ExampleListener::class,
        //],
    ];

    /**
     * The addon alias bindings.
     *
     * @type array|null
     */
    public $aliases = [
        //'Example' => Anomaly\AcrchitectExtension\Example::class
    ];

    /**
     * The addon class bindings.
     *
     * @type array|null
     */
    public $bindings = [];

    /**
     * The addon singleton bindings.
     *
     * @type array|null
     */
    public $singletons = [];

    /**
     * Additional service providers.
     *
     * @type array|null
     */
    public $providers = [
        //\ExamplePackage\Provider\ExampleProvider::class
    ];

    /**
     * The addon view overrides.
     *
     * @type array|null
     */
    public $overrides = [
        //'streams::errors/404' => 'module::errors/404',
        //'streams::errors/500' => 'module::errors/500',
    ];

    /**
     * The addon mobile-only view overrides.
     *
     * @type array|null
     */
    public $mobile = [
        //'streams::errors/404' => 'module::mobile/errors/404',
        //'streams::errors/500' => 'module::mobile/errors/500',
    ];

    /**
     * Register the addon.
     */
    public function register()
    {
        // Run extra pre-boot registration logic here.
        // Use method injection or commands to bring in services.
    }

    /**
     * Boot the addon.
     */
    public function boot()
    {
        // Run extra post-boot registration logic here.
        // Use method injection or commands to bring in services.
    }

    /**
     * Map additional addon routes.
     *
     * @param Router $router
     */
    public function map(Router $router)
    {
        // Register dynamic routes here for example.
        // Use method injection or commands to bring in services.
    }

}
