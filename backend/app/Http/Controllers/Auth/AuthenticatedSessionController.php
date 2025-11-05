<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Xử lý đăng nhập.
     */
    public function store(LoginRequest $request)
{
    $request->authenticate();
    $request->session()->regenerate();

    $user = Auth::user();
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'status' => true,
        'message' => 'Đăng nhập thành công!',
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
        ],
        'access_token' => $token,
        'token_type' => 'Bearer',
    ], 200);
}

    /**
     * Xử lý đăng xuất.
     */
    public function destroy(Request $request)
    {
        $user = $request->user();

        // Xóa tất cả token của user (đăng xuất khỏi mọi thiết bị)
        $user->tokens()->delete();

        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'status' => true,
            'message' => 'Đăng xuất thành công!',
        ]);
    }
}
