@extends('cms.layout')
@section('title', 'Content')
@section('header')
<form method="post" action="/admin/logout">@csrf<button>Sign out</button></form>
@endsection
@section('content')
<h1>Website content</h1>
<div class="columns">
    <aside class="panel">
        <h2>Entries</h2>
        <div class="actions"><button id="new-page">New page</button><button id="new-article">New article</button></div>
        <div id="entries" class="entry-list"></div>
    </aside>
    <section class="panel" aria-label="Content editor">
        <h2 id="editor-title">Edit content</h2>
        <div class="actions" id="publish-actions">
            <button data-action="save">Save draft</button>
            <button id="preview">Preview draft</button>
            <button class="primary" data-action="publish">Publish</button>
            <button data-action="unpublish">Unpublish</button>
        </div>
        <p id="status" role="status" aria-live="polite"></p>
        <div id="fields"></div>
    </section>
</div>
@endsection
@section('scripts')
<script>
    window.cmsEntries = {{ Illuminate\Support\Js::from($entries) }};
    window.cmsFiles = {{ Illuminate\Support\Js::from($files) }};
    window.cmsTemplates = {{ Illuminate\Support\Js::from($templates) }};
    window.cmsSettingsTemplate = {{ Illuminate\Support\Js::from($settingsTemplate) }};
</script>
<script src="/cms-editor.js" defer></script>
@endsection
