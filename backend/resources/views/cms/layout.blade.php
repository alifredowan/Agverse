<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title') · AGverse</title>
    <style>
        :root{color-scheme:light;font:16px/1.5 system-ui,sans-serif;color:#14201b;background:#f5f1e8}
        *{box-sizing:border-box}body{margin:0}header{background:#0b3d2e;color:white;padding:1rem max(1rem,4vw);display:flex;justify-content:space-between;align-items:center;gap:1rem}
        main{max-width:75rem;margin:2rem auto;padding:0 1rem}h1,h2,p{margin-top:0}a{color:#145b42;text-underline-offset:.2em}
        button,input,select,textarea{font:inherit}button,.button{display:inline-block;border:1px solid #0b3d2e;border-radius:.35rem;background:#fff;color:#0b3d2e;padding:.45rem .75rem;cursor:pointer;text-decoration:none}
        button:disabled{opacity:.5;cursor:default}.primary{background:#0b3d2e;color:white}
        input,select,textarea{width:100%;border:1px solid #809087;border-radius:.35rem;background:white;color:#14201b;padding:.45rem .6rem}input[type=checkbox]{width:auto}
        :focus-visible{outline:2px solid #14794e;outline-offset:3px}textarea{resize:vertical;min-height:5rem}
        label{display:grid;gap:.2rem;margin-bottom:.75rem}fieldset{border:1px solid #c3ccc4;border-radius:.35rem;min-width:0;margin:0 0 1rem;padding:1rem}
        details{background:#fff;border:1px solid #c3ccc4;border-radius:.35rem;padding:.75rem;margin-bottom:.65rem}summary{cursor:pointer;font-weight:700}details[open]>summary{margin-bottom:.75rem}
        .columns{display:grid;grid-template-columns:minmax(13rem,1fr) minmax(0,3fr);gap:1.5rem}.panel{background:#fff;padding:1rem;border:1px solid #c3ccc4;border-radius:.45rem}
        .actions{display:flex;gap:.5rem;flex-wrap:wrap;align-items:center;margin:.75rem 0}.entry-list{display:grid;gap:.4rem}.entry-list button{text-align:start;overflow-wrap:anywhere}
        .error{color:#a32028;white-space:pre-wrap}.muted{color:#40574d}.login{max-width:26rem;margin:5rem auto}img,video{max-width:100%;max-height:12rem;display:block;margin:.5rem 0}
        @media(max-width:700px){.columns{grid-template-columns:1fr}}
    </style>
</head>
<body>
<header><strong>AGverse CMS</strong>@yield('header')</header>
<main>@yield('content')</main>
@yield('scripts')
</body>
</html>
