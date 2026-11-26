<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    public function getConnectionName(): ?string
    {
        return config('database.leads_connection', 'mysql');
    }

    protected $fillable = [
        'submission_id',
        'full_name',
        'email',
        'phone',
        'company',
        'interest',
        'message',
        'ip',
        'user_agent',
        'status',
    ];
}
