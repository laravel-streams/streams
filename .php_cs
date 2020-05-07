<?php

use PhpCsFixer\Config;
use PhpCsFixer\Finder;

$rules = [
    '@PSR2' => true,

    'no_short_echo_tag' => true,
    'no_unused_imports' => true,
    'array_syntax' => ['syntax' => 'short'],
    'trailing_comma_in_multiline_array' => true,
    'not_operator_with_successor_space' => true,
    'no_multiline_whitespace_before_semicolons' => true,
];

$finder = Finder::create()
    ->notPath('bootstrap')
    ->notPath('storage')
    ->notPath('vendor')
    //->in(getcwd())
    ->name('*.php')
    ->notName('*.blade.php')
    ->notName('index.php')
    ->notName('server.php')
    ->ignoreDotFiles(true)
    ->ignoreVCS(true);

return Config::create()
    ->setFinder($finder)
    ->setRules($rules)
    ->setRiskyAllowed(true)
    ->setUsingCache(true);
