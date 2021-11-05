<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Streams\Core\Support\Facades\Streams;
use Streams\Core\Transformer\Typescript;
use Streams\Ui\Button\Button;

class TestCommand extends Command
{
    protected $signature = 'test';

    protected $description = 'test';

    public function handle()
    {

        $stream    = Streams::make('users');
        $arr       = $stream->toArray();
        $createdAT = $stream->created_at;
        $entries   = $stream->entries();
        $entry     = $entries->where('id', 'RyanThePyro')->first();

        $ts = new Typescript(Button::class);
        $ts->ignoreProperties([ '__callbacks', '__listeners', '__observers', ]);
        $props = $ts->transform();
        return;
    }
}
