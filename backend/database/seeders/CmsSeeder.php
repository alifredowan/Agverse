<?php

namespace Database\Seeders;

use App\Models\CmsEntry;
use Illuminate\Database\Seeder;

class CmsSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = json_decode(file_get_contents(database_path('seeders/cms-content.json')), true, flags: JSON_THROW_ON_ERROR);

        foreach (['page' => 'home', 'settings' => 'site'] as $kind => $slug) {
            CmsEntry::firstOrCreate(
                ['kind' => $kind, 'slug' => $slug],
                ['draft' => $defaults[$slug], 'published' => $defaults[$slug]],
            );
        }
    }
}
