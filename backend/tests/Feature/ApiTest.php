<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_health_and_content_endpoints(): void
    {
        $this->getJson('/api/health')
            ->assertOk()
            ->assertJsonPath('status', 'ok');

        $this->getJson('/api/content')
            ->assertOk()
            ->assertJsonPath('brand', 'AGVERSE')
            ->assertJsonCount(3, 'pillars');
    }

    public function test_contact_submission_validates_stores_and_handles_honeypot(): void
    {
        $this->postJson('/api/contact', [])
            ->assertStatus(400)
            ->assertJsonPath('success', false);

        $this->postJson('/api/contact', [
            'fullName' => 'Bot',
            'email' => 'bot@example.com',
            'message' => 'Spam',
            'bot_check' => 'filled',
        ])
            ->assertOk()
            ->assertJsonPath('success', true);

        $this->assertDatabaseCount('contact_submissions', 0);

        $response = $this->postJson('/api/contact', [
            'fullName' => 'Tariq Al Maktoum',
            'email' => 'tariq@farm.ae',
            'phone' => '+971501234567',
            'company' => 'Desert Oasis',
            'interest' => 'Tech Audit',
            'message' => 'Interested in drone fleet deployment.',
        ]);

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonStructure(['submissionId']);

        $this->assertDatabaseHas('contact_submissions', [
            'email' => 'tariq@farm.ae',
            'full_name' => 'Tariq Al Maktoum',
        ]);

        $this->getJson('/api/contact')->assertUnauthorized();

        $admin = \App\Models\User::factory()->create();
        $this->actingAs($admin)
            ->getJson('/api/contact')
            ->assertOk()
            ->assertJsonPath('count', 1);
    }

    public function test_audit_request_validates_stores_and_fetches_by_reference(): void
    {
        $this->postJson('/api/audit-request', [
            'fullName' => 'Amina',
        ])
            ->assertStatus(400)
            ->assertJsonPath('success', false);

        $createResponse = $this->postJson('/api/audit-request', [
            'fullName' => 'Amina Hassan',
            'email' => 'amina@oasis.ae',
            'phone' => '+971509876543',
            'farmName' => 'Al Ain Hydroponics',
            'location' => 'Al Ain, UAE',
            'farmSize' => '120 hectares',
        ]);

        $createResponse->assertStatus(201)
            ->assertJsonPath('success', true);

        $ref = $createResponse->json('referenceId');

        $this->getJson("/api/audit-request")->assertUnauthorized();
        $this->getJson("/api/audit-request/{$ref}")->assertUnauthorized();

        $admin = \App\Models\User::factory()->create();
        $this->actingAs($admin)
            ->getJson("/api/audit-request/{$ref}")
            ->assertOk()
            ->assertJsonPath('data.farm_name', 'Al Ain Hydroponics');

        $this->actingAs($admin)
            ->getJson('/api/audit-request/AGV-000000')
            ->assertStatus(404);
    }

    public function test_ai_status_and_ask_endpoints(): void
    {
        config(['services.anthropic.key' => null]);

        $this->getJson('/api/ai/status')
            ->assertOk()
            ->assertJsonPath('configured', false);

        $this->postJson('/api/ai/ask', ['prompt' => 'Hello'])
            ->assertStatus(503)
            ->assertJsonPath('success', false);

        config(['services.anthropic.key' => 'test-key']);

        Http::fake([
            'https://api.anthropic.com/v1/messages' => Http::response([
                'content' => [['text' => 'Use drip sensors for optimal moisture.']],
            ], 200),
        ]);

        $this->postJson('/api/ai/ask', ['prompt' => 'How to save water?'])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('answer', 'Use drip sensors for optimal moisture.');
    }

    public function test_leads_models_use_configured_leads_connection(): void
    {
        $original = config('database.leads_connection');
        config(['database.leads_connection' => 'mysql']);

        try {
            $this->assertSame('mysql', (new \App\Models\ContactSubmission())->getConnectionName());
            $this->assertSame('mysql', (new \App\Models\AuditRequest())->getConnectionName());
        } finally {
            config(['database.leads_connection' => $original]);
        }
    }
}
