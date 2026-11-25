<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\CmsAdminSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class CmsTest extends TestCase
{
    use RefreshDatabase;

    public function test_local_initialization_creates_the_default_admin(): void
    {
        $this->app['env'] = 'local';

        $this->seed();

        $admin = User::where('email', 'admin@agverse.test')->firstOrFail();
        $this->assertSame('CMS Admin', $admin->name);
        $this->assertFalse(password_get_info($admin->password)['algo'] === null);
    }

    public function test_configured_admin_is_seeded_once_and_can_sign_in(): void
    {
        $email = 'seed-admin@example.test';
        $password = 'initial-test-password';
        config(['cms.admin_email' => $email, 'cms.admin_password' => $password]);
        $this->seed(CmsAdminSeeder::class);

        config(['cms.admin_password' => 'different-test-password']);
        $this->seed(CmsAdminSeeder::class);

        $this->assertSame(1, User::where('email', $email)->count());
        $this->post('/admin/login', ['email' => $email, 'password' => $password])->assertRedirect('/admin/media');
        $this->assertAuthenticatedAs(User::where('email', $email)->firstOrFail());
    }

    public function test_homepage_is_seeded_and_admin_requires_authentication(): void
    {
        $this->seed();
        $this->getJson('/api/cms')->assertOk()->assertJsonPath('content.blocks.0.type', 'hero');
        $this->get('/admin/media')->assertRedirect('/admin/login');
        $this->getJson('/admin/preview')->assertUnauthorized();
        $this->postJson('/admin/upload')->assertUnauthorized();
    }

    public function test_article_draft_publish_update_and_unpublish(): void
    {
        $payload = [
            'kind' => 'article', 'slug' => 'field-notes', 'action' => 'save',
            'draft' => ['en' => ['title' => 'Field notes', 'body' => 'Initial article.'], 'ar' => ['title' => '']],
        ];
        $this->actingAs(User::factory()->create());
        $id = $this->postJson('/admin/entries', $payload)->assertOk()->json('id');
        $this->getJson('/api/cms?path=/articles/field-notes')->assertNotFound();
        $this->getJson('/admin/preview?path=/articles/field-notes')->assertOk()->assertJsonPath('content.en.title', 'Field notes');

        $payload['id'] = $id;
        $payload['action'] = 'publish';
        $this->postJson('/admin/entries', $payload)->assertOk();
        $this->getJson('/api/cms?path=/articles')->assertOk()->assertJsonPath('articles.0.slug', 'field-notes');
        $this->getJson('/api/cms?path=/articles/field-notes')->assertOk()->assertJsonPath('content.en.body', 'Initial article.');

        $payload['draft']['en']['body'] = 'Unpublished update.';
        $payload['action'] = 'save';
        $this->postJson('/admin/entries', $payload)->assertOk();
        $this->getJson('/api/cms?path=/articles/field-notes')->assertJsonPath('content.en.body', 'Initial article.');
        $this->getJson('/admin/preview?path=/articles/field-notes')->assertJsonPath('content.en.body', 'Unpublished update.');

        $payload['action'] = 'unpublish';
        $this->postJson('/admin/entries', $payload)->assertOk();
        $this->getJson('/api/cms?path=/articles/field-notes')->assertNotFound();
    }

    public function test_page_publish_normalizes_youtube_links_and_rejects_invalid_urls(): void
    {
        $media = ['title' => 'Demo', 'youtube' => 'https://youtu.be/M7lc1UVf-VE?t=3'];
        $payload = [
            'kind' => 'page', 'slug' => 'demo', 'action' => 'publish',
            'draft' => [
                'content' => ['en' => ['video' => $media], 'ar' => ['video' => $media]],
                'blocks' => [['type' => 'video', 'id' => 'video', 'enabled' => true]],
            ],
        ];
        $this->actingAs(User::factory()->create());
        $id = $this->postJson('/admin/entries', $payload)->assertOk()->json('id');
        $this->getJson('/api/cms?path=/demo')->assertOk()->assertJsonPath('content.content.en.video.youtube', 'https://www.youtube.com/watch?v=M7lc1UVf-VE');
        $payload['id'] = $id;
        $payload['draft']['content']['en']['video']['youtube'] = 'https://example.org/watch?v=M7lc1UVf-VE';
        $this->postJson('/admin/entries', $payload)->assertUnprocessable()->assertJsonValidationErrors('youtube');
    }

    public function test_admin_can_upload_and_reuse_supported_media(): void
    {
        Storage::fake('public');
        $this->actingAs(User::factory()->create());
        $url = $this->postJson('/admin/upload', ['file' => UploadedFile::fake()->image('field.png')])
            ->assertCreated()->json('url');
        Storage::disk('public')->assertExists('cms/'.basename($url));
        $this->get($url)->assertOk()->assertHeader('X-Content-Type-Options', 'nosniff');
        $this->postJson('/admin/upload', ['file' => UploadedFile::fake()->create('document.txt', 2)])
            ->assertUnprocessable()->assertJsonValidationErrors('file');
    }
}
