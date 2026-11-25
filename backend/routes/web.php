<?php

use App\Http\Controllers\CmsController;
use Illuminate\Support\Facades\Route;

Route::get('/api/cms', [CmsController::class, 'content']);
Route::get('/cms-media/{name}', [CmsController::class, 'file'])->where('name', '[A-Za-z0-9]+\.(?:jpg|jpeg|png|webp|gif|avif|mp4)');

Route::prefix('admin')->group(function () {
    Route::view('/login', 'cms.login')->name('login');
    Route::post('/login', [CmsController::class, 'login'])->middleware('throttle:5,1');

    Route::middleware('auth')->group(function () {
        Route::redirect('/', '/admin/media');
        Route::get('/media', [CmsController::class, 'index']);
        Route::post('/logout', [CmsController::class, 'logout']);
        Route::post('/entries', [CmsController::class, 'save']);
        Route::post('/upload', [CmsController::class, 'upload'])->middleware('throttle:20,1');
        Route::get('/preview', [CmsController::class, 'content'])->name('cms.preview');
    });
});
