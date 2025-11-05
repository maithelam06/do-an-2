<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::middleware(['web', 'guest'])->group(function () {
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::post('/reset-password', [NewPasswordController::class, 'store'])
        ->name('password.update');
});

require __DIR__.'/auth.php';
