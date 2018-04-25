<?php


function custom_theme_setup() {

  // add a link to the WP Toolbar
function custom_toolbar_link($wp_admin_bar) {
  $args = array(
      'id' => 'wpbeginner',
      'title' => 'Page d\'accueil',
      'href' => 'http://localhost:8888/wordpress_apchq/wp-admin/post.php?post=49&action=edit',
      'meta' => array(
          'class' => 'wpbeginner',
          'title' => 'Search WPBeginner Tutorials'
          )
  );
  $wp_admin_bar->add_node($args);
}
add_action('admin_bar_menu', 'custom_toolbar_link', 999);


  add_theme_support( 'post-thumbnails' );
  add_theme_support( 'title-tag' );

  // ******** Resize images ********
  add_image_size( '600x600', 600, 600, true );
  add_image_size( '900x900', 900, 900, true );
  add_image_size( '1200x1200', 1200, 1200, false );
  add_image_size( '1400x900', 1400, 900, true );

  add_theme_support( 'html5', array(
   'search-form',
   'gallery',
   'caption',
  ) );
}
add_action( 'after_setup_theme', 'custom_theme_setup' );

$labelsServices = array(
  'name' => "Services",
  'singular_name' => "Service",
  'add_new' => "Ajouter un service",
  'add_new_item' => "Ajouter un service",
  'edit_item' => "Modifier un service",
  'new_item' => "Nouveau service",
  'all_items' => "Tous les services",
  'view_item' => "Voir le service",
  'search_items' => "Chercher un service",
  'not_found' =>  "Aucun service trouvé",
  'menu_name' => "Mes services"
);

$argService = array(
    'labels' => $labelsServices,
    'public' => true,
    'has_archive' => true,
    'hierarchical' => true,
    'menu_position' => 20,
    'menu_icon' => 'dashicons-laptop',
    'supports' => array('title', 'thumbnail', 'editor', 'revisions', 'page-attributes')
);
register_post_type('services', $argService);


// ACF GOOGLE MAP
function my_acf_init() {

	acf_update_setting('google_api_key', 'AIzaSyC-7ldGe4nZp2XlXOKwSn7Iu65vbaMLKSo');
}

add_action('acf/init', 'my_acf_init');


function custom_api_register_routes() {
  register_rest_route( 'apchq-api', '/succursales', array(
    'methods'  => 'GET',
    'callback' => 'apchq_api_get_endpoint_succursale',
  ));
}
add_action( 'rest_api_init', 'custom_api_register_routes' );


function apchq_api_get_endpoint_succursale() {
$count = 0;
$response = array();
$args = array(
'post_type' => 'succursale',
'posts_per_page' => -1,
'post_status' => 'publish',
);

$business_query = new WP_Query( $args );
  if( $business_query->have_posts() ):
    while( $business_query->have_posts() ): $business_query->the_post();

    $succursale = get_field('succursale_address');
    $response[] = array(

    'lat' => html_entity_decode( $succursale['lat'] ),
    'lng' => html_entity_decode( $succursale['lng'] ),
    'address' => html_entity_decode( $succursale['address'] ),
    'name' => html_entity_decode( get_field('succursale_name') ),
    'infos' => html_entity_decode( get_field('succursale_infos') ),

    );
    endwhile;
  endif;
return rest_ensure_response( $response );
}
