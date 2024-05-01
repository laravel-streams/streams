<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Streams\Core\Support\Traits\Streams;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Streams\Core\Entry\Contract\EntryInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements EntryInterface, MustVerifyEmail
{
    use HasFactory, Notifiable, Streams;

    protected $stream = 'users';

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected array $relationships = [];

    public function markEmailAsVerified(): void
    {
        $this->email_verified_at = $this->freshTimestamp();

        $this->save();
    }
}
