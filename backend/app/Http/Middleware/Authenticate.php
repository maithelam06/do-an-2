<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo($request): ?string
    {
        // Nếu request không phải là API, thì redirect về trang login.
        // Còn nếu là API (vd: từ React gửi axios), sẽ trả lỗi 401 thay vì redirect.
        return $request->expectsJson() ? null : route('login');
    }
}
