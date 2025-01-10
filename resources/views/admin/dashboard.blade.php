<div class="p-8">

    Count: {{ $count }}
    <br>
    <br>
    <x-ui::action href="#" color="black" wire:click="increment">Increment</x-ui::action>
    <br>
    <br>
    <x-ui::action color="black" wire:click="decrement">Decrement</x-ui::action>
    <br>
    <br>
    <x-ui::action color="danger" wire:click="zero">Reset</x-ui::action>

</div>
