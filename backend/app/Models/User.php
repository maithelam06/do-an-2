<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens; //THÊM DÒNG NÀY
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable,HasApiTokens;

    /**
     * Các thuộc tính có thể gán hàng loạt (mass assignable)
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'dob',
        'role'
    ];

    /**
     * Các thuộc tính ẩn khi chuyển model thành JSON
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Kiểu dữ liệu được tự động chuyển đổi (cast)
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed', // Laravel 10+ tự hash khi set password
    ];
}
