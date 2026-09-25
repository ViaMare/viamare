<?php
if (!defined('ABSPATH')) { exit; }

define('VM_THEME_VERSION', '6.0.0-dev');

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('via-mare', get_template_directory_uri() . '/assets/css/site.css', [], VM_THEME_VERSION);
    wp_enqueue_script('supabase-js', 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2', [], null, true);
    wp_enqueue_script('via-mare', get_template_directory_uri() . '/assets/js/site.js', ['supabase-js'], VM_THEME_VERSION, true);
});

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form','gallery','caption','style','script']);
});

function vm_page_url($slug = '') {
    if ($slug === '' || $slug === 'home') return home_url('/');
    return home_url('/' . trim($slug, '/') . '/');
}
