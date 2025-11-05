<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function profile(Request $request)
    {
        return response()->json([
            'message' => 'Thông tin người dùng hiện tại',
            'user' => $request->user(),
        ]);
    }

    public function orders()
    {
        return response()->json([
            'message' => 'Danh sách đơn hàng của người dùng (ví dụ)',
        ]);
    }
}
