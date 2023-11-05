<?php

namespace App\Components;

use Streams\Ui\Components\Page;

class AdminDashboard extends Page
{
    protected string $template = <<<'blade'
        <form wire:submit.prevent="login">
            <div>
                <label for="email">Email</label>
                <input wire:model="email" type="email" id="email">
            </div>

            <div>
                <label for="password">Password</label>
                <input wire:model="password" type="password" id="password">
            </div>

            <div>
                <label for="remember">Remember Me</label>
                <input wire:model="remember" type="checkbox" id="remember">
            </div>

            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    blade;
}
