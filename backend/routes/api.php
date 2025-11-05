<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Đây là nơi định nghĩa toàn bộ API của bạn.
| Laravel Sanctum được sử dụng để bảo vệ các route yêu cầu xác thực.
|--------------------------------------------------------------------------
*/

// ========== AUTH ==========
// Đăng ký
Route::post('/register', [RegisteredUserController::class, 'store']);

// Đăng nhập / Đăng xuất
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

// Lấy thông tin user (cần token)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// ========== USER ROUTES ==========
Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::get('/user/profile', [UserController::class, 'profile']);
    Route::get('/user/orders', [UserController::class, 'orders']); // ví dụ thêm
});


// ========== ADMIN ROUTES ==========
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/admin/users', [AdminController::class, 'listUsers']);
});
