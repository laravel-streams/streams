<?php

use Illuminate\Database\Migrations\Migration;
use Anomaly\Streams\Platform\Field\FieldSchema;
use Anomaly\Streams\Platform\Stream\StreamSchema;
use Anomaly\Streams\Platform\Stream\StreamManager;

class CreatePlantsTable extends Migration
{
    /**
     * Run the migration.
     */
    public function up()
    {
        $schema = new StreamSchema(StreamManager::get('plants'));

        $schema->create(function (FieldSchema $schema) {
            foreach ($schema->stream->fields as $field) {
                $schema->add($field);
            }
        });
    }

    /**
     * Revert the migration.
     */
    public function down()
    {
        (new StreamSchema(StreamManager::get('plants')))->drop('plants');
    }
}
