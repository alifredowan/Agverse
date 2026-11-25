<?php

namespace App\Http\Controllers;

use App\Models\CmsEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class CmsController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate(['email' => 'required|email|max:255', 'password' => 'required|string|max:255']);

        if (! Auth::attempt($credentials)) {
            throw ValidationException::withMessages(['email' => 'Invalid email or password.']);
        }

        $request->session()->regenerate();

        return redirect('/admin/media');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login');
    }

    public function index()
    {
        $files = array_map(fn (string $path) => '/cms-media/'.basename($path), Storage::disk('public')->files('cms'));

        $defaults = json_decode(file_get_contents(database_path('seeders/cms-content.json')), true, flags: JSON_THROW_ON_ERROR);

        return view('cms.editor', [
            'entries' => CmsEntry::orderBy('kind')->orderBy('slug')->get(),
            'files' => $files,
            'templates' => $defaults['home']['content'],
            'settingsTemplate' => $defaults['site'],
        ]);
    }

    public function save(Request $request)
    {
        $data = $request->validate([
            'id' => 'nullable|integer|exists:cms_entries,id',
            'kind' => ['required', Rule::in(['page', 'article', 'settings'])],
            'slug' => ['required', 'max:120', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', Rule::unique('cms_entries')->where('kind', $request->input('kind'))->ignore($request->integer('id'))],
            'draft' => 'required|array',
            'action' => ['required', Rule::in(['save', 'publish', 'unpublish'])],
        ]);
        if ($data['kind'] === 'page' && in_array($data['slug'], ['admin', 'api', 'articles', 'cms-media'], true)) {
            throw ValidationException::withMessages(['slug' => 'This address is reserved.']);
        }
        $entry = isset($data['id']) ? CmsEntry::findOrFail($data['id']) : new CmsEntry();
        if ($entry->exists && ($entry->kind !== $data['kind'] || $entry->slug !== $data['slug'])) {
            throw ValidationException::withMessages(['slug' => 'The address and type are fixed after the first save.']);
        }

        $draft = $data['draft'];
        if ($data['kind'] === 'page') {
            validator($draft, [
                'content.en' => 'required|array',
                'content.ar' => 'required|array',
                'blocks' => 'present|array|max:100',
                'blocks.*.id' => 'required|string|distinct|max:120',
                'blocks.*.type' => 'required|in:hero,about,technology,stats,ctaBanner,sustainability,roi,ndviDemo,caseStudies,faq,contact,text,image,video',
                'blocks.*.enabled' => 'required|boolean',
            ])->validate();
            $singletons = array_filter(array_column($draft['blocks'], 'type'), fn ($type) => ! in_array($type, ['text', 'image', 'video']));
            if (count($singletons) !== count(array_unique($singletons))) {
                throw ValidationException::withMessages(['blocks' => 'Each built-in section can appear once per page.']);
            }
            foreach ($draft['blocks'] as $block) {
                foreach (['en', 'ar'] as $lang) {
                    if (! is_array($draft['content'][$lang][$block['id']] ?? null)) {
                        throw ValidationException::withMessages(['blocks' => 'Every block requires English and Arabic content fields.']);
                    }
                }
            }
        } else {
            validator($draft, ['en' => 'required|array', 'ar' => 'required|array'])->validate();
        }
        if ($data['kind'] === 'article') {
            $rules = [];
            foreach (['en', 'ar'] as $lang) {
                $rules[$lang.'.title'] = ($lang === 'en' && $data['action'] === 'publish' ? 'required' : 'nullable').'|string|max:255';
                $rules[$lang.'.body'] = ($lang === 'en' && $data['action'] === 'publish' ? 'required' : 'nullable').'|string|max:50000';
                foreach (['summary', 'category', 'cover', 'alt', 'seoTitle', 'seoDescription'] as $field) {
                    $rules[$lang.'.'.$field] = 'nullable|string|max:2048';
                }
            }
            validator($draft, $rules)->validate();
        }
        if (strlen(json_encode($draft, JSON_THROW_ON_ERROR)) > 750000) {
            throw ValidationException::withMessages(['draft' => 'Content exceeds the 750 KB limit.']);
        }

        $draft = $this->normalizeMedia($draft);
        $entry->fill(['kind' => $data['kind'], 'slug' => $data['slug'], 'draft' => $draft]);
        if ($data['action'] === 'publish') {
            $entry->published = $draft;
        }
        if ($data['action'] === 'unpublish') {
            abort_if($entry->kind === 'settings' || ($entry->kind === 'page' && $entry->slug === 'home'), 422, 'The homepage and site settings must stay published.');
            $entry->published = null;
        }
        $entry->save();

        return response()->json($entry);
    }

    private function normalizeMedia(array $fields): array
    {
        foreach ($fields as $key => $value) {
            if (is_array($value)) {
                $fields[$key] = $this->normalizeMedia($value);
                continue;
            }
            if ($key !== 'youtube' || $value === '' || $value === null) {
                continue;
            }
            $url = is_string($value) ? parse_url($value) : false;
            $host = strtolower($url['host'] ?? '');
            $path = $url['path'] ?? '';
            $id = null;
            if (($url['scheme'] ?? '') === 'https' && ! isset($url['user'])) {
                if ($host === 'youtu.be') {
                    $id = ltrim($path, '/');
                } elseif (in_array($host, ['youtube.com', 'www.youtube.com', 'm.youtube.com'], true)) {
                    parse_str($url['query'] ?? '', $query);
                    $id = $path === '/watch' ? ($query['v'] ?? null) : null;
                    if (preg_match('~^/(?:shorts|embed)/([^/]+)$~', $path, $matches)) {
                        $id = $matches[1];
                    }
                }
            }
            if (! is_string($id) || ! preg_match('/^[A-Za-z0-9_-]{11}$/D', $id)) {
                throw ValidationException::withMessages(['youtube' => 'Enter a valid HTTPS YouTube video, Shorts, or share link.']);
            }
            $fields[$key] = 'https://www.youtube.com/watch?v='.$id;
        }

        return $fields;
    }

    public function upload(Request $request)
    {
        $request->validate(['file' => 'required|file|mimes:jpeg,png,webp,gif,avif,mp4|max:51200']);
        $path = $request->file('file')->store('cms', 'public');
        abort_unless($path, 500, 'Upload failed.');

        return response()->json(['url' => '/cms-media/'.basename($path)], 201);
    }

    public function file(string $name)
    {
        $path = Storage::disk('public')->path('cms/'.$name);
        abort_unless(is_file($path), 404);

        return response()->file($path, ['X-Content-Type-Options' => 'nosniff', 'Cache-Control' => 'public, max-age=31536000, immutable']);
    }

    public function content(Request $request, string $path = '/')
    {
        $requestedPath = $request->query('path', $path);
        abort_unless(is_string($requestedPath) && strlen($requestedPath) <= 160, 400);
        $path = '/'.trim($requestedPath, '/');
        $preview = $request->routeIs('cms.preview');
        $column = $preview ? 'draft' : 'published';
        $query = CmsEntry::query()->whereNotNull($column);
        $kind = str_starts_with($path, '/articles/') ? 'article' : 'page';
        $slug = match (true) {
            $path === '/' => 'home',
            $kind === 'article' => substr($path, strlen('/articles/')),
            default => ltrim($path, '/'),
        };
        $articleIndex = $path === '/articles';
        $entry = $articleIndex ? null : (clone $query)->where(['kind' => $kind, 'slug' => $slug])->first();
        $articles = $articleIndex
            ? (clone $query)->where('kind', 'article')->latest()->get()->map(function (CmsEntry $article) use ($column) {
                $summary = ['slug' => $article->slug];
                foreach (['en', 'ar'] as $lang) {
                    $summary[$lang] = array_intersect_key($article->{$column}[$lang] ?? [], array_flip(['title', 'summary', 'cover', 'alt', 'category']));
                }

                return $summary;
            })
            : [];
        $settings = (clone $query)->where(['kind' => 'settings', 'slug' => 'site'])->first();

        return response()->json([
            'kind' => $articleIndex ? 'articleIndex' : $kind,
            'content' => $entry?->{$column},
            'articles' => $articles,
            'settings' => $settings?->{$column},
        ], $entry || $articleIndex ? 200 : 404)->header('Cache-Control', 'no-store');
    }
}
