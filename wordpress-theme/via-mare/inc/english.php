<?php
if (!defined('ABSPATH')) { exit; }

function vm_en_nav($active='') {
  $items=['home'=>'Home','about'=>'About us','accommodation'=>'Accommodation','gallery'=>'Gallery','beaches'=>'Beaches','buljarica'=>'Buljarica','contact'=>'Contact'];
  $out='';
  foreach($items as $slug=>$label){
    $href=$slug==='home'?home_url('/en/'):home_url('/en/'.$slug.'/');
    $cls=$active===$slug?' class="active" aria-current="page"':'';
    $out.='<a href="'.esc_url($href).'"'.$cls.'>'.esc_html($label).'</a>';
  }
  return $out;
}
function vm_en_header($active='') {
  $t=trailingslashit(get_template_directory_uri());
  return '<div class="utility"><div class="container"><span>Buljarica · Montenegro · <span class="category-stars" aria-label="4 stars">★★★★</span></span><div><a href="'.esc_url(home_url('/')).'">MNE/SRB</a><a href="'.esc_url(home_url('/en/')).'">EN</a></div></div></div><header><div class="container header-inner"><a class="logo" href="'.esc_url(home_url('/en/')).'"><img src="'.esc_url($t.'assets/images/via-mare-logo.svg').'" alt="Apartments Via Mare"></a><button class="menu-toggle" aria-label="Open menu">☰</button><nav class="main-nav">'.vm_en_nav($active).'</nav><a class="header-book" href="'.esc_url(home_url('/en/booking/')).'">Book now</a></div></header>';
}
function vm_en_footer() {
 return '<footer><div class="container"><b>APARTMENTS VIA MARE <span class="category-stars" aria-label="4 stars">★★★★</span></b><p>Buljarica bb · 85300 Petrovac na Moru · Montenegro</p></div></footer>';
}
function vm_en_document($title,$active,$body,$bodyClass='') {
 $t=trailingslashit(get_template_directory_uri());
 $base=trailingslashit(home_url('/en/'));
 return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'.esc_html($title).' · Apartments Via Mare</title><link rel="stylesheet" href="'.esc_url($t.'assets/css/site.css?v='.VM_THEME_VERSION).'"><script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script><script>window.VM_EN_BASE='.wp_json_encode($base).';</script></head><body class="'.esc_attr($bodyClass).'">'.vm_en_header($active).'<main>'.$body.'</main>'.vm_en_footer().'<script src="'.esc_url($t.'assets/js/site-en.js?v='.VM_THEME_VERSION).'"></script></body></html>';
}

function vm_en_unit_data() {
 return [
 'standard-triple-studio'=>['Standard Triple Studio','30 m²','3 guests','Ground / 1st floor','Balcony'],
 'triple-studio-with-balcony'=>['Triple Studio with Balcony','30 m²','3 guests','Ground / 1st floor','Balcony'],
 'triple-studio-with-sea-view'=>['Triple Studio with Sea View','30 m²','3 guests','2nd floor','Sea view'],
 'standard-one-bedroom-apartment'=>['Standard One-Bedroom Apartment','40 m²','4 guests','Ground / 1st floor','Balcony'],
 'one-bedroom-apartment-with-balcony'=>['One-Bedroom Apartment with Balcony','40 m²','4 guests','Ground / 1st floor','Balcony'],
 'one-bedroom-apartment-with-sea-view'=>['One-Bedroom Apartment with Sea View','40 m²','4 guests','2nd floor','Sea view'],
 'apartment-with-sea-view-attic'=>['Sea View Apartment – Attic','35 m²','3 guests','Attic','Sea view']
 ];
}
function vm_en_unit_page($slug) {
 $all=vm_en_unit_data(); if(!isset($all[$slug])) return null; $u=$all[$slug];
 $fac=['Air conditioning','Free Wi-Fi','Private bathroom','Shower','Hair dryer','Towels and bed linen','Flat-screen TV','Refrigerator','Cooktop','Kitchenware','Private parking',$u[4]];
 $lis=''; foreach($fac as $x)$lis.='<li>'.esc_html($x).'</li>';
 $b='<section class="unit-hero"><div class="container"><span class="kicker light">APARTMENTS VIA MARE</span><h1>'.esc_html($u[0]).'</h1><p>'.esc_html($u[1].' · '.$u[2].' · '.$u[3].' · '.$u[4]).'</p></div></section><section class="section"><div class="container unit-layout"><div><span class="kicker">ACCOMMODATION</span><h2>'.esc_html($u[0]).'</h2><p class="large">Comfortable accommodation at Apartments Via Mare in peaceful Buljarica, close to the Adriatic coast.</p><ul class="facility-grid">'.$lis.'</ul></div><aside class="unit-cta"><h2>Check your stay</h2><p>Choose your dates and continue to the direct booking page.</p><a class="gold-btn" href="'.esc_url(home_url('/en/booking/?unit='.$slug)).'">Check availability</a></aside></div><div class="container"><div class="unit-gallery" data-en-unit="'.esc_attr($slug).'"></div></div></section>';
 return vm_en_document($u[0],'accommodation',$b,'vm-en-unit');
}

function vm_en_page($slug) {
 $unitDoc=vm_en_unit_page($slug); if($unitDoc!==null) return $unitDoc;
 switch($slug){
 case '':
 case 'home':
   $b='<section class="hero"><div id="hero-media" class="hero-media"></div><div class="hero-shade"></div><div class="container hero-content"><span class="hero-stars"><span class="category-stars" aria-label="4 stars">★★★★</span></span><h1>A place of peace and rest.<br><i>Close to the sea.</i></h1><p>14 apartments in Buljarica · 260 m from the beach · up to 48 guests</p><div><a class="gold-btn" href="'.esc_url(home_url('/en/booking/')).'">Book your stay</a><a class="outline-btn" href="'.esc_url(home_url('/en/gallery/')).'">View gallery</a></div></div></section><section class="story section"><div class="container story-grid"><div><span class="kicker">WELCOME TO VIA MARE</span><h2>A place where your holiday truly begins.</h2></div><div><p class="large">Apartments Via Mare is located in peaceful Buljarica, a few minutes’ walk from the beach and about 2 km from Petrovac.</p><p>Fourteen accommodation units provide capacity for up to 48 guests. Private parking and Wi-Fi are free, and transfers, excursions and car rental can be arranged on request.</p></div></div></section><section class="section suites"><div class="container"><div class="section-head"><div><span class="kicker">ACCOMMODATION</span><h2>Find your apartment.</h2></div></div><div id="unit-grid" class="suite-grid"><div class="loading">Loading accommodation…</div></div></div></section>';
   return vm_en_document('Home','home',$b,'vm-en-home');
 case 'about':
   $b='<section class="page-hero"><div class="container"><span class="kicker light">ABOUT VIA MARE</span><h1>Comfort in peaceful Buljarica.</h1></div></section><section class="section"><div class="container editorial-grid"><div><span class="kicker">APARTMENTS VIA MARE</span><h2>Four stars close to the sea.</h2></div><div><p class="large">Via Mare offers 14 accommodation units in Buljarica, around 260 metres from the beach.</p><p>Studios and one-bedroom apartments are arranged across the property, with free private parking, Wi-Fi and barbecue facilities available to guests.</p></div></div></section>';
   return vm_en_document('About us','about',$b);
 case 'accommodation':
   $b='<section class="page-hero"><div class="container"><span class="kicker light">7 ACCOMMODATION TYPES</span><h1>Apartments</h1><p>From triple studios to one-bedroom apartments for four guests.</p></div></section><section class="section"><div class="container"><div id="unit-grid" class="suite-grid"><div class="loading">Loading accommodation…</div></div></div></section>';
   return vm_en_document('Accommodation','accommodation',$b);
 case 'gallery':
   $b='<section class="page-hero"><div class="container"><span class="kicker light">VIA MARE IN PICTURES</span><h1>Gallery</h1></div></section><section class="section gallery-section gallery-editorial"><div class="gallery-wide"><div class="gallery-heading"><div><span class="kicker">APARTMENTS VIA MARE</span><h2>Photo gallery</h2></div><button id="gallery-show-all" class="gallery-show-all" type="button">Show all photos</button></div><div id="gallery-filters" class="gallery-filters"></div><div id="gallery-featured" class="gallery-featured"></div><div id="full-gallery" class="full-gallery" hidden></div></div></section>';
   return vm_en_document('Gallery','gallery',$b,'vm-page-gallery gallery-page');
 case 'beaches':
   $b='<section class="page-hero"><div class="container"><span class="kicker light">THE ADRIATIC COAST</span><h1>Beaches</h1><p>Buljarica, Lučice and the Petrovac coastline are within easy reach.</p></div></section><section class="section"><div class="container"><div class="beach-list"><article><span class="beach-num">01</span><div><h2>Buljarica Beach</h2><p class="large">A long, open beach only a short walk from Via Mare.</p></div></article><article><span class="beach-num">02</span><div><h2>Lučice</h2><p class="large">A sheltered bay near Petrovac, suitable for a short coastal excursion.</p></div></article></div></div></section>';
   return vm_en_document('Beaches','beaches',$b);
 case 'buljarica':
   $b='<section class="page-hero"><div class="container"><span class="kicker light">SEA · NATURE · CENTURIES OF HISTORY</span><h1>Buljarica</h1><p>A place where the Adriatic coast, Paštrovići heritage and old monasteries meet in one landscape.</p></div></section><section class="section"><div class="container editorial-grid"><div><span class="kicker">THE PLACE</span><h2>The quieter side of the Budva Riviera.</h2></div><div><p class="large">South of Petrovac, Buljarica opens towards the sea with a broad coastline and spacious hinterland.</p><p class="large">For Via Mare guests it means easy access to the beach and a convenient base for Petrovac, Lučice and the cultural landscape of Paštrovići.</p></div></div></section>';
   return vm_en_document('Buljarica','buljarica',$b);
 case 'contact':
   $b='<section class="page-hero contact-hero"><div class="container"><span class="kicker light">CONTACT</span><h1>We are here for questions<br>about your stay.</h1></div></section><section class="section"><div class="container contact-message-grid"><div><span class="kicker">SEND AN ENQUIRY</span><h2>How can we help?</h2></div><form id="inquiry-form" class="inquiry refined-inquiry"><input name="name" required placeholder="Full name"><input name="email" type="email" required placeholder="Email"><input name="phone" type="tel" placeholder="Phone"><textarea name="message" rows="6" placeholder="Your message" required></textarea><button class="gold-btn" type="submit">Send enquiry</button><p id="form-status"></p></form></div></section>';
   return vm_en_document('Contact','contact',$b);
 case 'booking':
   $b='<section class="page-hero"><div class="container"><span class="kicker light">DIRECT BOOKING</span><h1>Secure online payment</h1><p>The checkout is prepared for future payment-gateway and channel-manager integration.</p></div></section><section class="section"><div class="container checkout-grid"><form id="checkout-form" class="checkout-card"><h2>Stay details</h2><div class="stay-dates"><label><span>Arrival</span><input name="arrival" type="date" required></label><label><span>Departure</span><input name="departure" type="date" required></label></div><label class="unit-select-label"><span>Accommodation type</span><select name="unit" id="payment-unit"><option value="">Select accommodation type</option></select></label><input name="name" required placeholder="Full name"><input name="email" type="email" required placeholder="Email"><h2>Payment method</h2><p>Visa / Mastercard / 3-D Secure will be enabled through a certified payment processor. Via Mare will not store card data.</p><button class="gold-btn">Continue to payment</button><p id="payment-status"></p></form><aside class="order-card"><h2 id="payment-unit-title">Select accommodation type</h2><p>Prices and availability will appear after PMS/channel-manager integration.</p></aside></div></section>';
   return vm_en_document('Online booking','',$b);
 }
 return null;
}
