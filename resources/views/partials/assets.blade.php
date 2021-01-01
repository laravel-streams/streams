{!! Assets::tag('/vendor/streams/core/js/index.js') !!}

{!! Assets::tag('/js/app.js') !!}

<script>
    window.streams.core.app.bootstrap({
        providers: [
            window.streams.core.StreamsServiceProvider,
            window.app.AppServiceProvider
        ]
    }).then(app => {
        return app.boot();
    }).then(app => {
        return app.start();
    });
</script>
