<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'message' => 'Chào mừng Admin đến trang quản trị!',
        ]);
    }

    public function listUsers()
    {
        return response()->json([
            'users' => User::all(),
        ]);
    }
}
