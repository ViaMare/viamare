<?php
if (!defined('ABSPATH')) { exit; }
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width,initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class('vm-wordpress-development'); ?>>
<?php wp_body_open(); ?>
<main class="vm-dev-shell">
  <h1>Via Mare WordPress</h1>
  <p>Development branch is connected. Page templates and local assets are built from this repository.</p>
</main>
<?php wp_footer(); ?>
</body>
</html>
