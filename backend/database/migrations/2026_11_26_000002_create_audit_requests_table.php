<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::connection(config('database.leads_connection', 'mysql'))->create('audit_requests', function (Blueprint $table) {
            $table->id();
            $table->string('reference_id')->unique();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->string('farm_name');
            $table->string('location')->default('Dubai, UAE');
            $table->string('farm_size')->default('Not specified');
            $table->string('interest')->default('Autonomous Robotics');
            $table->text('notes')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::connection(config('database.leads_connection', 'mysql'))->dropIfExists('audit_requests');
    }
};
