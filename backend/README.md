# AGverse CMS

Laravel 13 provides the admin editor, content API, media storage, and all REST API endpoints (`/api/contact`, `/api/audit-request`, `/api/content`, `/api/ai/*`, `/api/health`). React renders published content.

## Local setup

From the repository root, install the existing Node dependencies and set up Laravel once.

```powershell
npm run install:all
Set-Location backend
composer install
Copy-Item .env.example .env
php artisan key:generate
```

By default, `backend/.env` uses **PostgreSQL** (`DB_CONNECTION=pgsql`) as the primary database (`users`, `sessions`, `cache`, `jobs`, `cms_entries`) and **MySQL** (`LEADS_DB_CONNECTION=mysql` with `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_DATABASE`, `MYSQL_USERNAME`, `MYSQL_PASSWORD`) for `contact_submissions` and `audit_requests`. For single-database local development, you can set both `DB_CONNECTION` and `LEADS_DB_CONNECTION` to `pgsql`, `mysql`, or `sqlite`.

```powershell
php artisan migrate --seed
Set-Location ..
npm run dev
```

On a fresh local database, seeding creates `admin@agverse.test` and prints its randomly generated password once. To choose the initial credentials, set `CMS_ADMIN_EMAIL` and `CMS_ADMIN_PASSWORD` in `backend/.env` before seeding. Re-running the seed preserves the existing account and password. Open [the CMS](http://localhost:5050/admin/media) through Vite so site previews and uploads share the Laravel session and origin.

For an already initialized database, run `php artisan db:seed --class=CmsAdminSeeder` from `backend/`. You can create additional admin accounts with `php artisan cms:admin your-email@example.com`.

## Edit and publish

- **Home** contains the imported sections. Open a block to edit its English and Arabic fields. Use the block controls to change order or visibility. Use **Add block** for text, images, videos and built-in sections.
- **Site** contains global settings, including branding, navigation and footer. Use links such as `/#contact`, `/articles`, or a published page's URL.
- **New article** creates an entry under `/articles/<slug>`. Blank Arabic article fields use the corresponding English content. Separate paragraphs with a blank line.
- Upload images or MP4s (up to 50 MB), or pick a previous upload in the same field. To embed a video, paste an HTTPS YouTube watch, share or Shorts link into the `youtube` field. YouTube takes precedence when both video sources are set.
- **Save draft** updates the private preview. **Publish** makes that snapshot public. **Unpublish** removes an article or custom page from the public API. Published entries can keep a newer draft.

The initial content is exported from the React defaults with `node client/scripts/export-cms-content.js`. Seeding creates the homepage and settings when absent and preserves existing CMS edits.

## Production routing

Use one HTTPS origin. Route `/admin` and descendants, `/api/*`, `/cms-media/*`, and `/cms-editor.js` to Laravel with `backend/public` as its document root. Preserve the public host on requests to Laravel so login redirects and draft previews use the site origin. Serve the React build with its SPA fallback for published page and article URLs. Article SEO fields populate the browser metadata after React loads.

Set `APP_ENV=production`, `APP_DEBUG=false`, the public `APP_URL`, and `SESSION_SECURE_COOKIE=true` in the Laravel environment. Keep Laravel's media storage persistent across deploys. Configure PHP's upload limit to 50 MB and its POST limit to 52 MB, and match the web server request limit. Public media URLs can be shared independently of page publication.

For administrator provisioning during production setup, supply both `CMS_ADMIN_EMAIL` and `CMS_ADMIN_PASSWORD` as deployment secrets, then remove them after the account is created. You can also provision the account interactively with `php artisan cms:admin your-email@example.com`.

Run backend checks with `php artisan test` from `backend/` and build React with `npm run build` from the repository root.

