<?php

namespace App;

use Anomaly\Streams\Platform\Model\Traits\Streams;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TestModel
 *
 * @link   http://pyrocms.com/
 * @author PyroCMS, Inc. <support@pyrocms.com>
 * @author Ryan Thompson <ryan@pyrocms.com>
 */
class TestModel extends Model
{

    use Streams;

    /**
     * The stream definition.
     *
     * @var array
     */
    protected static $stream = [
        'slug' => 'users_example',
    ];
}
