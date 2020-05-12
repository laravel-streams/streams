{!! img('anomaly.theme.flow::img/nebula.jpg')
    ->fit(600, 600)
    ->width('300px')
    // ->sources([
    //     '(min-width: 600px)' => [
    //         'resize' => 400,
    //         'quality' => 60,
    //     ],
    //     '(min-width: 1600px)' => [
    //         'resize' => 800,
    //         'quality' => 90,
    //     ],
    //     // 'fallback' => [
    //     //     'resize' => 1800
    //     // ]
    // ])
    ->alt('Horsehead Nebula - Orion')
    ->img() !!}
    {{-- ->picture() !!} --}}

    {{ dd(app('anomaly.module.users::users')) }}

    @foreach ($collection as $item)
        
    @endforeach
