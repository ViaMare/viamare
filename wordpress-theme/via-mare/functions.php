<?php
if (!defined('ABSPATH')) { exit; }
define('VM_THEME_VERSION', '6.0.0-dev.9');
require_once get_template_directory() . '/inc/english.php';

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form','gallery','caption','style','script']);
});

function vm_route_map() {
    return [
      ''=>'index.html','home'=>'index.html','o-nama'=>'o-nama.html','smestaj'=>'smestaj.html',
      'galerija'=>'galerija.html','plaze'=>'plaze.html','buljarica'=>'buljarica.html',
      'kontakt'=>'kontakt.html','placanje'=>'placanje.html',
      'standard-triple-studio'=>'standard-triple-studio.html',
      'triple-studio-with-balcony'=>'triple-studio-with-balcony.html',
      'triple-studio-with-sea-view'=>'triple-studio-with-sea-view.html',
      'standard-one-bedroom-apartment'=>'standard-one-bedroom-apartment.html',
      'one-bedroom-apartment-with-balcony'=>'one-bedroom-apartment-with-balcony.html',
      'one-bedroom-apartment-with-sea-view'=>'one-bedroom-apartment-with-sea-view.html',
      'apartment-with-sea-view-attic'=>'apartment-with-sea-view-attic.html'
    ];
}

function vm_render_bundled_page() {
    if (is_admin()) return;
    $rawPath = trim((string)parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
    $homePath0 = trim((string)parse_url(home_url('/'), PHP_URL_PATH), '/');
    if ($homePath0 && strpos($rawPath, $homePath0) === 0) $rawPath = trim(substr($rawPath, strlen($homePath0)), '/');
    if ($rawPath === 'en' || strpos($rawPath, 'en/') === 0) {
        $enSlug = $rawPath === 'en' ? '' : trim(substr($rawPath, 3), '/');
        $doc = vm_en_page($enSlug);
        if ($doc !== null) { echo $doc; exit; }
    }
    $path = trim((string)parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
    $homePath = trim((string)parse_url(home_url('/'), PHP_URL_PATH), '/');
    if ($homePath && strpos($path, $homePath) === 0) $path = trim(substr($path, strlen($homePath)), '/');
    $slug = $path === '' ? '' : basename($path, '.html');
    $map = vm_route_map();
    if (!array_key_exists($slug, $map)) return;

    $file = get_template_directory() . '/site/' . $map[$slug];
    if (!is_readable($file)) return;
    $html = file_get_contents($file);
    $theme = trailingslashit(get_template_directory_uri());

    // All presentation assets are served from the installed theme, never fetched from GitHub.
    $html = preg_replace('~<link rel="stylesheet" href="styles\.css(?:\?[^"]*)?">~', '<link rel="stylesheet" href="'.$theme.'assets/css/site.css?v='.VM_THEME_VERSION.'">', $html);
    $html = preg_replace('~<script src="app\.js(?:\?[^"]*)?"></script>~', '<script src="'.$theme.'assets/js/site.js?v='.VM_THEME_VERSION.'"></script>', $html);

    // Preserve the original Via Mare logo used by the source site.
    $original_logo = esc_url('https://raw.githubusercontent.com/ViaMare/viamare/main/via_mare_upscaled_4x%20%281%29.jpg');
    $html = preg_replace('~src="(?:via-mare-logo\\.svg|via_mare_upscaled_4x \\(1\\)\\.jpg)"~', 'src="'.$original_logo.'"', $html);

    // Standardize the top navy utility bar on every MNE/SRB page.
    // It must always contain Buljarica, Montenegro, four stars and the language switch.
    $lang_switch = '<div class="vm-language-switch"><a class="active" href="'.esc_url(home_url('/')).'">MNE/SRB</a><span aria-hidden="true"> / </span><a href="'.esc_url(home_url('/en/')).'">EN</a></div>';
    $utility = '<div class="utility"><div class="container"><span>Buljarica · Montenegro · <span class="category-stars" aria-label="4 zvjezdice">★★★★</span></span>'.$lang_switch.'</div></div>';

    // Remove any source-page utility variant, then inject one canonical bar directly after <body>.
    $html = preg_replace('~<div class="utility">.*?</div>\s*</div>~s', '', $html, 1);
    $html = preg_replace('~(<body[^>]*>)~i', '$1'.$utility, $html, 1);

    // Route internal static links through WordPress clean URLs.
    foreach ($map as $s => $source) {
        $url = $s === '' ? home_url('/') : home_url('/'.$s.'/');
        $html = str_replace('href="'.$source.'"', 'href="'.esc_url($url).'"', $html);
    }
    echo $html;
    exit;
}
add_action('template_redirect', 'vm_render_bundled_page', 0);
