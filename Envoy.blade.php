@setup
require __DIR__.'/vendor/autoload.php';

//$dotenv = \Dotenv\Dotenv::createImmutable(__DIR__);

$dotenv = \Dotenv\Dotenv::create(
    \Illuminate\Support\Env::getRepository(),
    __DIR__,
    '.env'
);

try {
    $dotenv->load();
    $dotenv->required(['DEPLOY_SERVER', 'DEPLOY_REPOSITORY', 'DEPLOY_PATH'])->notEmpty();
} catch ( Exception $e )  {
    echo $e->getMessage();
}

$server = env('DEPLOY_SERVER');
$repo = env('DEPLOY_REPOSITORY');
$path = env('DEPLOY_PATH');
$slack = env('DEPLOY_SLACK_WEBHOOK');
$healthUrl = env('DEPLOY_HEALTH_CHECK');

$php = env('DEPLOY_PHP_BINARY') ?: 'php';
$mysql = env('DEPLOY_MYSQL_BINARY') ?: 'mysql';
$composer = env('DEPLOY_COMPOSER_BINARY') ?: 'composer';
$defaultBranch = env('DEPLOY_DEFAULT_BRANCH') ?: 'master';

if ( substr($path, 0, 1) !== '/' ) throw new Exception('Your deployment must begin with /');

$date = ( new DateTime )->format('YmdHis');
$env = isset($env) ? $env : "production";
$branch = isset($branch) ? $branch : $defaultBranch;
$update = isset($update) ? $update : false;
$path = rtrim($path, '/');
@endsetup

@servers(['web' => $server])

@task('init')
if [ ! -d {{ $path }} ]; then
cd {{ $path }}
git clone {{ $repo }} --branch={{ $branch }} --depth=1 -q {{ $path }}
echo "Repository cloned"
cp {{ $path }}/.env.example {{ $path }}/.env
{{ $php }} {{ $path }}/artisan key:generate --ansi
fi
ln -s {{ $path }}/.env {{ $path }}/.env
echo "Environment file set up"
echo "Deployment initialised. Run 'envoy run deploy' now."
@endtask

@story('push')
pull
refresh
health_check_ping
@endstory

@story('revert')
revert
refresh
health_check_ping
@endstory

@story('refresh')
refresh
@endstory

@task('composer')
echo "Installing composer dependencies."
cd {{ $path }}
{{ $composer }} install --no-interaction --quiet --no-dev --prefer-dist --optimize-autoloader --ignore-platform-reqs
@endtask

@task('migrate')
{{ $php }} {{ $path }}/artisan migrate --env={{ $env }} --force --no-interaction
@endtask

@story('deploy')
{{-- @if ( isset($backup) && $backup )
    deployment_backup
@endif --}}
pull
composer
migrate
refresh
health_check_ping
@endstory

@story('rollback')
revert
composer
rollback
health_check_ping
@endstory

{{-- @story('health_check')
health_check_ping
@endstory --}}

@task('pull')
cd {{ $path }}
git pull
@endtask

@task('revert')
cd {{ $path }}
echo "Revert started"
git reset --keep HEAD@{1}
@endtask

@task('refresh')
#{{ $php }} {{ $path }}/artisan refresh --quiet
#echo "System refreshed"
@endtask

@task('rollback')
cd {{ $path }}
{{ $php }} {{ $path }}/artisan migrate:rollback --env={{ $env }} --force --no-interaction
echo "Rolled back."
@endtask

@task('health_check_ping')
@if ( ! empty($healthUrl) )
    if [ "$(curl --write-out "%{http_code}\n" --silent --output /dev/null {{ $healthUrl }})" == "200" ]; then
    printf "\033[0;32mHealth check to {{ $healthUrl }} OK\033[0m\n"
    else
    printf "\033[1;31mHealth check to {{ $healthUrl }} FAILED\033[0m\n"
    fi
@else
        echo "Ping Skipped: [DEPLOY_HEALTH_CHECK] URL not set"
@endif
@endtask

{{--
@finished
	@slack($slack, '#deployments', "Deployment [{$branch}] on {$server}: {$date} complete")
@endfinished
--}}
