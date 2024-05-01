<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class VerifyEmail
{
    public function handle(Request $request, \Closure $next): Response
    {
        if (($user = Auth::user()) && !$user->email_verified_at) {
            return redirect(route('verification.notice'));
        }

        return $next($request);
    }
}
