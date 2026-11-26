<?php

use App\Http\Controllers\Api\AiController;
use App\Http\Controllers\Api\AuditRequestController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ContentController;
use Illuminate\Support\Facades\Route;

Route::get('/health', [ContentController::class, 'health']);
Route::get('/content', [ContentController::class, 'index']);

Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:15,1');
Route::post('/audit-request', [AuditRequestController::class, 'store'])->middleware('throttle:15,1');

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/contact', [ContactController::class, 'index']);
    Route::get('/audit-request', [AuditRequestController::class, 'index']);
    Route::get('/audit-request/{ref}', [AuditRequestController::class, 'show']);
});

Route::get('/ai/status', [AiController::class, 'status']);
Route::post('/ai/ask', [AiController::class, 'ask'])->middleware('throttle:10,1');
