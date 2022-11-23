<div>
    <form wire:submit.prevent="submit">
        <input wire:model="email" type="email" name="email" id="email" placeholder="Email">
        <input wire:model="password" type="password" name="password" id="password" placeholder="Password">
        <button>Submit</button>
    </form>
</div>
