<?php

use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Validator;

Artisan::command('cms:admin {email}', function () {
    $email = $this->argument('email');
    $password = $this->secret('Choose a password (at least 12 characters)');
    $validation = Validator::make(
        ['email' => $email, 'password' => $password],
        ['email' => 'required|email|max:255|unique:users,email', 'password' => 'required|string|min:12|max:72'],
    );

    if ($validation->fails()) {
        $this->error($validation->errors()->first());

        return 1;
    }

    User::create(['name' => 'CMS Admin', 'email' => $email, 'password' => $password]);
    $this->info('Admin account created.');

    return 0;
})->purpose('Create a CMS admin account');
