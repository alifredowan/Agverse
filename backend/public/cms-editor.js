const entries = window.cmsEntries;
const files = window.cmsFiles;
const csrf = document.querySelector('meta[name=csrf-token]').content;
const fields = document.querySelector('#fields');
const status = document.querySelector('#status');
const preview = document.querySelector('#preview');
const actionBar = document.querySelector('#publish-actions');
const blocks = ['hero', 'about', 'technology', 'stats', 'ctaBanner', 'sustainability', 'roi', 'ndviDemo', 'caseStudies', 'faq', 'contact', 'text', 'image', 'video'];
const articleFields = { title: '', summary: '', category: '', cover: '', alt: '', body: '', seoTitle: '', seoDescription: '' };
let current;
let dirty = false;
let busy = false;

function element(tag, text, parent) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    parent.append(node);
    return node;
}

function button(parent, text, action, disabled = false) {
    const node = element('button', text, parent);
    node.onclick = action;
    node.disabled = disabled;
    return node;
}

function tell(message, error = false) {
    status.textContent = message;
    status.className = error ? 'error' : 'muted';
}

async function request(path, body) {
    const headers = { Accept: 'application/json', 'X-CSRF-TOKEN': csrf };
    if (!(body instanceof FormData)) headers['Content-Type'] = 'application/json';
    const response = await fetch(path, { method: 'POST', headers, body: body instanceof FormData ? body : JSON.stringify(body) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const errors = Object.values(data.errors || {}).flat().join('\n');
        throw new Error(errors || (response.status === 419 ? 'Session expired. Reload and sign in again.' : data.message || 'Request failed.'));
    }
    return data;
}

function openEntry(entry) {
    if (!entry || busy || (dirty && !confirm('Discard unsaved changes?'))) return;
    current = structuredClone(entry);
    for (const lang of ['en', 'ar']) {
        if (current.kind === 'page') {
            const content = current.draft.content[lang];
            for (const block of current.draft.blocks) {
                content[block.id] = { ...window.cmsTemplates[lang][block.type], ...content[block.id] };
            }
        } else if (current.kind === 'settings') {
            const defaults = window.cmsSettingsTemplate[lang];
            const saved = current.draft[lang];
            current.draft[lang] = { ...defaults, ...saved, footer: { ...defaults.footer, ...saved.footer } };
        }
    }
    dirty = false;
    tell('');
    render();
}

function mediaField(key, label) {
    return /^(image|bgImage|logo|cover|poster|mp4)$/i.test(key) && !label.toLowerCase().includes('label');
}

function field(parent, data, key, name = key) {
    const value = data[key];
    if (value !== null && typeof value === 'object') {
        const group = element('details', '', parent);
        element('summary', name, group);
        Object.keys(value).forEach((item) => field(group, value, item, Array.isArray(value) ? value[item]?.title || value[item]?.label || `Item ${Number(item) + 1}` : item));
        if (Array.isArray(value) && value.length && value[0] && typeof value[0] === 'object' && !['hotspots'].includes(key) && !(key === 'items' && !('title' in value[0]))) {
            const actions = element('div', '', group);
            actions.className = 'actions';
            button(actions, 'Duplicate last item', () => {
                const copy = structuredClone(value.at(-1));
                if (typeof copy.id === 'string') copy.id = crypto.randomUUID();
                value.push(copy);
                group.replaceWith(field(document.createDocumentFragment(), data, key, name));
                dirty = true;
            });
            if (value.length > 1) button(actions, 'Remove last item', () => {
                value.pop();
                group.replaceWith(field(document.createDocumentFragment(), data, key, name));
                dirty = true;
            });
        }
        return group;
    }

    const wrapper = element('div', '', parent);
    const label = element('label', name, wrapper);
    const long = ['body', 'description', 'summary', 'seoDescription'].includes(key) || String(value ?? '').length > 130;
    const input = element(long ? 'textarea' : 'input', '', label);
    if (typeof value === 'boolean') {
        input.type = 'checkbox';
        input.checked = value;
    } else {
        if (typeof value === 'number') { input.type = 'number'; input.step = 'any'; }
        input.value = value ?? '';
    }
    input.oninput = () => {
        data[key] = input.type === 'checkbox' ? input.checked : input.type === 'number' ? Number(input.value) : input.value;
        dirty = true;
    };
    if (key === 'body') {
        const tip = element('small', 'Separate paragraphs with a blank line. Use ## for headings, - for list items, **bold**, or [label](https://example.com).', wrapper);
        tip.className = 'muted';
    }
    if (mediaField(key, name)) {
        const uploadLabel = element('label', key === 'mp4' ? 'Upload MP4 (up to 50 MB)' : 'Upload image', wrapper);
        const upload = element('input', '', uploadLabel);
        upload.type = 'file';
        upload.accept = key === 'mp4' ? 'video/mp4' : 'image/jpeg,image/png,image/webp,image/gif,image/avif';
        const renderPreview = () => {
            wrapper.querySelector('img,video')?.remove();
            if (!/^\/(?:cms-media|images|assets)\/[\w.-]+$/.test(String(data[key]))) return;
            const asset = element(key === 'mp4' ? 'video' : 'img', '', wrapper);
            asset.src = data[key];
            if (key === 'mp4') { asset.controls = true; asset.preload = 'metadata'; }
            else asset.alt = 'Selected image';
        };
        const reuse = element('label', 'Reuse an uploaded file', wrapper);
        const choices = element('select', '', reuse);
        const fillChoices = () => {
            choices.replaceChildren();
            element('option', 'Select a file', choices).value = '';
            files.filter((url) => url.endsWith('.mp4') === (key === 'mp4')).forEach((url) => {
                element('option', url.split('/').at(-1), choices).value = url;
            });
        };
        fillChoices();
        choices.onfocus = fillChoices;
        choices.onchange = () => {
            if (!choices.value) return;
            input.value = choices.value;
            input.oninput();
            renderPreview();
        };
        renderPreview();
        input.addEventListener('change', renderPreview);
        upload.onchange = async () => {
            if (!upload.files[0]) return;
            busy = true;
            upload.disabled = true;
            const payload = new FormData();
            payload.append('file', upload.files[0]);
            tell('Uploading…');
            try {
                const asset = await request('/admin/upload', payload);
                files.push(asset.url);
                input.value = asset.url;
                input.oninput();
                renderPreview();
                tell('Uploaded. Save or publish to apply this file.');
            } catch (error) {
                tell(error.message, true);
            } finally {
                busy = false;
                upload.disabled = false;
                upload.value = '';
            }
        };
    }
    return wrapper;
}

function editBlocks(parent) {
    const { draft } = current;
    const templates = window.cmsTemplates;
    const list = element('div', '', parent);
    const redraw = () => {
        list.replaceChildren();
        draft.blocks.forEach((block, index) => {
            const row = element('details', '', list);
            element('summary', block.type + (block.enabled ? '' : ' (hidden)'), row);
            const controls = element('div', '', row);
            controls.className = 'actions';
            function move(offset) {
                draft.blocks.splice(index, 1);
                draft.blocks.splice(index + offset, 0, block);
                dirty = true;
                redraw();
            }
            button(controls, 'Move up', () => move(-1), index === 0);
            button(controls, 'Move down', () => move(1), index === draft.blocks.length - 1);
            button(controls, block.enabled ? 'Hide' : 'Show', () => { block.enabled = !block.enabled; dirty = true; redraw(); });
            button(controls, 'Remove', () => { draft.blocks.splice(index, 1); for (const lang of ['en', 'ar']) delete draft.content[lang][block.id]; dirty = true; redraw(); });
            for (const [lang, label] of [['en', 'English'], ['ar', 'Arabic']]) {
                const content = draft.content[lang];
                const key = block.id;
                const editor = field(row, content, key, label);
                if (lang === 'ar') editor.dir = 'rtl';
            }
        });
    };
    redraw();
    const label = element('label', 'Block type', parent);
    const select = element('select', '', label);
    blocks.forEach((type) => { element('option', type, select).value = type; });
    button(parent, 'Add block', () => {
        const type = select.value;
        if (!['text', 'image', 'video'].includes(type) && draft.blocks.some((block) => block.type === type)) {
            tell('This section is already on the page.', true);
            return;
        }
        const id = type + '-' + crypto.randomUUID();
        for (const lang of ['en', 'ar']) {
            const defaults = { title: '', body: '', image: '', alt: '', youtube: '', mp4: '' };
            const usable = type === 'text' ? ['title', 'body'] : type === 'image' ? ['title', 'image', 'alt'] : ['title', 'youtube', 'mp4'];
            draft.content[lang][id] = structuredClone(templates[lang][type] ?? Object.fromEntries(usable.map((key) => [key, defaults[key]])));
        }
        draft.blocks.push({ id, type, enabled: true });
        dirty = true;
        redraw();
    });
}

function render() {
    const nav = document.querySelector('#entries');
    nav.replaceChildren();
    entries.forEach((entry) => {
        const item = button(nav, `${entry.kind} / ${entry.slug} · ${entry.published ? 'Published' : 'Draft'}`, () => openEntry(entry));
        if (entry.id === current?.id) item.setAttribute('aria-current', 'true');
    });
    fields.replaceChildren();
    actionBar.hidden = !current;
    if (!current) { element('p', 'Choose an entry or create a page or article.', fields); return; }
    document.querySelector('#editor-title').textContent = current.slug || `New ${current.kind}`;
    const fixed = current.kind === 'settings' || (current.kind === 'page' && current.slug === 'home');
    actionBar.querySelector('[data-action=unpublish]').disabled = fixed || !current.published;
    preview.disabled = current.kind === 'settings';
    if (!current.id) field(fields, current, 'slug', 'URL slug');
    if (current.kind === 'page') {
        for (const lang of ['en', 'ar']) field(fields, current.draft.content[lang], 'meta', lang === 'en' ? 'English page metadata' : 'Arabic page metadata');
        editBlocks(fields);
    } else {
        field(fields, current.draft, 'en', 'English');
        field(fields, current.draft, 'ar', 'Arabic').dir = 'rtl';
    }
}

async function save(action) {
    if (!current || busy) return false;
    busy = true;
    tell('Saving…');
    try {
        const updated = await request('/admin/entries', { id: current.id, kind: current.kind, slug: current.slug, draft: current.draft, action });
        const index = entries.findIndex((entry) => entry.id === updated.id);
        if (index < 0) entries.push(updated);
        else entries[index] = updated;
        current = structuredClone(updated);
        dirty = false;
        render();
        tell({ save: 'Draft saved.', publish: 'Published.', unpublish: 'Unpublished.' }[action]);
        return true;
    } catch (error) {
        tell(error.message, true);
        return false;
    } finally {
        busy = false;
    }
}

document.querySelectorAll('[data-action]').forEach((node) => { node.onclick = () => save(node.dataset.action); });
preview.onclick = async () => {
    if (!current || busy) return;
    if ((dirty || !current.id) && !(await save('save'))) return;
    const path = current.kind === 'article' ? '/articles/' + current.slug : current.slug === 'home' ? '/' : '/' + current.slug;
    location.assign(path + '?preview=1');
};
document.querySelector('#new-page').onclick = () => {
    const meta = { title: '', description: '' };
    openEntry({ kind: 'page', slug: '', draft: { blocks: [], content: { en: { meta: { ...meta } }, ar: { meta: { ...meta } } } } });
};
document.querySelector('#new-article').onclick = () => openEntry({ kind: 'article', slug: '', draft: { en: { ...articleFields }, ar: { ...articleFields } } });
window.addEventListener('beforeunload', (event) => { if (dirty) event.preventDefault(); });
openEntry(entries.find((entry) => entry.slug === 'home') ?? entries[0]);
if (!current) render();

