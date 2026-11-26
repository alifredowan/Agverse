<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditRequest extends Model
{
    public function getConnectionName(): ?string
    {
        return config('database.leads_connection', 'mysql');
    }

    protected $fillable = [
        'reference_id',
        'full_name',
        'email',
        'phone',
        'farm_name',
        'location',
        'farm_size',
        'interest',
        'notes',
        'status',
    ];
}
