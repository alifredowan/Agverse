<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CmsAdminSeeder extends Seeder
{
    public function run(): void
    {
        $email = config('cms.admin_email');
        $password = config('cms.admin_password');

        if (app()->environment('local')) {
            $email = $email ?: 'admin@agverse.test';
        }

        if (! $email && ! $password) {
            return;
        }

        Validator::make(['email' => $email], ['email' => 'required|email|max:255'])->validate();

        if (User::where('email', $email)->exists()) {
            return;
        }

        $generated = app()->environment('local') && ! $password;
        $password = $generated ? Str::password(24) : $password;
        Validator::make(
            ['password' => $password],
            ['password' => ['bail', 'required', 'string', 'min:12', function ($attribute, $value, $fail) {
                if (strlen($value) > 72) {
                    $fail('The CMS admin password must be at most 72 bytes.');
                }
            }]],
        )->validate();

        $user = User::firstOrCreate(['email' => $email], ['name' => 'CMS Admin', 'password' => $password]);

        if ($user->wasRecentlyCreated && $generated) {
            $this->command?->info('CMS admin email: '.$email);
            $this->command?->info('One-time display of your CMS admin password: '.$password);
        }
    }
}
