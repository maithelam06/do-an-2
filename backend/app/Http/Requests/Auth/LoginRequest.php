<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Xác định user có quyền gửi request này không.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Quy tắc validate input.
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Thực hiện xác thực đăng nhập.
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        // Nếu sai email hoặc mật khẩu
        if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'message' => 'Email hoặc mật khẩu không đúng!',
            ]);
        }

        // Nếu đúng thì reset bộ đếm rate limit
        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Kiểm tra giới hạn số lần thử đăng nhập.
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'message' => "Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau {$seconds} giây.",
        ]);
    }

    /**
     * Tạo key rate limit dựa trên email + IP.
     */
    public function throttleKey(): string
    {
        return Str::lower($this->input('email')).'|'.$this->ip();
    }

    /**
     * Tùy chỉnh response khi validate thất bại.
     */
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $response = response()->json([
            'status' => false,
            'message' => 'Thông tin đăng nhập không hợp lệ!',
            'errors' => $validator->errors(),
        ], 422);

        throw new \Illuminate\Validation\ValidationException($validator, $response);
    }
}
