@extends('cms.layout')
@section('title', 'Sign in')
@section('content')
<section class="panel login">
    <h1>Sign in</h1>
    @if ($errors->any()) <p class="error" role="alert">{{ $errors->first() }}</p> @endif
    <form action="/admin/login" method="post">
        @csrf
        <label>Email <input name="email" type="email" autocomplete="username" value="{{ old('email') }}" required></label>
        <label>Password <input name="password" type="password" autocomplete="current-password" required></label>
        <button class="primary">Sign in</button>
    </form>
</section>
@endsection
