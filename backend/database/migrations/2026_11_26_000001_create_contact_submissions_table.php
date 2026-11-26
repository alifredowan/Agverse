<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::connection(config('database.leads_connection', 'mysql'))->create('contact_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('submission_id')->unique();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            $table->string('interest')->default('Tech Audit');
            $table->text('message');
            $table->string('ip', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->string('status')->default('new');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::connection(config('database.leads_connection', 'mysql'))->dropIfExists('contact_submissions');
    }
};
