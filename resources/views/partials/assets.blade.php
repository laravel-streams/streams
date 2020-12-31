<script src="/vendor/streams/core/js/index.js"></script>
<script src="/vendor/streams/ui/js/index.js"></script>

<script>
    window.streams.core.app.bootstrap({
        providers: [
            window.streams.core.StreamsServiceProvider,
            window.app.UiServiceProvider
        ]
    }).then(app => {
        return app.boot();
    }).then(app => {
        return app.start();
    });
</script>
