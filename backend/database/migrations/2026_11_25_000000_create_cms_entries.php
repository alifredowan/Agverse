<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('cms_entries', function (Blueprint $table) {
            $table->id();
            $table->string('kind', 16);
            $table->string('slug', 120);
            $table->json('draft');
            $table->json('published')->nullable();
            $table->timestamps();
            $table->unique(['kind', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cms_entries');
    }
};
