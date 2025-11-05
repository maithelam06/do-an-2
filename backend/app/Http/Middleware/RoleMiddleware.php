<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Kiểm tra quyền truy cập theo role.
     * Cho phép nếu user có 1 trong các role được chỉ định.
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Chưa đăng nhập.'], 401);
        }

        if (!in_array($user->role, $roles)) {
            return response()->json(['message' => 'Bạn không có quyền truy cập.'], 403);
        }

        return $next($request);
    }
}
