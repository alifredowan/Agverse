<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsEntry extends Model
{
    protected $fillable = ['kind', 'slug', 'draft', 'published'];

    protected function casts(): array
    {
        return ['draft' => 'array', 'published' => 'array'];
    }
}
