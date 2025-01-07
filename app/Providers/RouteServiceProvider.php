<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->configureRoutes();
    }
     /**
     * Configure the routes for the application.
     *
     * @return void
     */
    protected function configureRoutes()
    {
        // Web routes
        Route::middleware('web')
             ->group(base_path('routes/web.php'));

        // API routes
        Route::prefix('api')
             ->middleware('api')
             ->group(base_path('routes/api.php'));
    }
}
