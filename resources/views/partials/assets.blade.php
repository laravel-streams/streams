{!! Assets::tag('/vendor/streams/core/js/index.js') !!}
{{-- {!! Assets::tag('/vendor/streams/api/js/index.js') !!} --}}
{{-- {!! Assets::tag('/vendor/streams/ui/js/index.js') !!} --}}

{!! Assets::tag('/js/app.js') !!}

<script>
(function () {
    var app = window.streams.core.app;
    app
        .initialize({
            providers: [
                window.streams.core.HttpServiceProvider,
                window.streams.core.StreamsServiceProvider,
                // window.streams.api.StreamsServiceProvider,
                // window.streams.ui.UiServiceProvider,
                window.app.AppServiceProvider
            ],
            config   : {
                http: {
                    //baseURL: this.env.get('APP_URL', 'http://localhost') + '/' + this.env.get('STREAMS_API_PREFIX', 'api'),
                    baseURL: 'https://workbench.local:8890/api',
                },
                streams: {
                    //xdebug: true
                }
            },
        })
        .then(app.boot.bind(app))
        .then(function (app) {
            app.start();
        })
        .then(function (app) {
            // started
        });
}).call(window);
</script>
