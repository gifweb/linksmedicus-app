<?php

/**
 * @wordpress-plugin
 * Plugin Name:       LinksMedicus App
 * Plugin URI:        https://www.linksmedicus.com
 * Description:       Configurações do aplicativo mobile
 * Version:           2.0.0
 * Author:            Djamba Tecnologia
 * Author URI:        http://www.djamba.com.br/
 * License:           MIT
 */

add_action('rest_api_init', 'add_custom_data');

function add_custom_data()
{

    // Remove the default filter.
    //remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
    // Add a Custom filter.
    /*add_filter( 'rest_pre_serve_request', function( $value ) {
    header( 'Access-Control-Allow-Origin: *' );
    header( 'Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE' );
    header( 'Access-Control-Allow-Credentials: true' );
    return $value;
    });*/

    register_rest_field('category', 'img', array(
        'get_callback' => 'get_image_data',
        'schema' => array(
            'description' => 'Image from category',
            'type' => 'string',
            'context' => array('view', 'edit'),
        ),
    ));

    register_rest_field('category', 'nomepc', array(
        'get_callback' => 'get_nomepc_data',
        'schema' => array(
            'description' => 'Nome PC',
            'type' => 'string',
            'context' => array('view', 'edit'),
        ),
    ));

    register_rest_field('post', 'desc', array(
        'get_callback' => 'get_desc_data',
        'schema' => array(
            'description' => 'Descrição',
            'type' => 'string',
            'context' => array('view', 'edit'),
        ),
    ));

    register_rest_field('post', 'url', array(
        'get_callback' => 'get_link_data',
        'schema' => array(
            'description' => 'Link',
            'type' => 'string',
            'context' => array('view', 'edit'),
        ),
    ));

    register_rest_field('guidelines', 'guidelines', array(
        'get_callback' => 'get_guideline_data',
        'schema' => array(
            'description' => 'Guideline',
            'type' => 'object',
            'context' => array('view'),
        ),
    ));

    register_rest_field('search', 'url', array(
        'get_callback' => 'get_searchlink_data',
        'schema' => array(
            'description' => 'Link',
            'type' => 'string',
            'context' => array('view', 'edit'),
        ),
    ));
}

function get_searchlink_data($object, $field_name, $request)
{
    if (function_exists('get_field')) {
        return get_field('search', $object['id']);
    }
}

function get_guideline_data($object, $field_name, $request)
{
    if (function_exists('get_field')) {
        return get_field('001', $object['id']);
    }
}

function get_link_data($object, $field_name, $request)
{
    if (function_exists('get_field')) {
        return get_field('link', $object['id']);
    }
}

function get_desc_data($object, $field_name, $request)
{
    if (function_exists('get_field')) {
        return get_field('descric', $object['id']);
    }
}

function get_image_data($object, $field_name, $request)
{
    if (function_exists('z_taxonomy_image_url')) {
        return z_taxonomy_image_url($object['id']);
    }
}

function get_nomepc_data($object, $field_name, $request)
{
    if (function_exists('the_field')) {
        return get_field('nome_pc', 'category_' . $object['id']);
    }
}

add_action('init', 'my_custom_post_type_rest_support', 25);
function my_custom_post_type_rest_support()
{
    global $wp_post_types;

    //be sure to set this to the name of your post type!
    $post_type_name = 'search';
    if (isset($wp_post_types[$post_type_name])) {
        $wp_post_types[$post_type_name]->show_in_rest = true;
        $wp_post_types[$post_type_name]->rest_base = $post_type_name;
    }
}

add_filter('rest_post_collection_params', 'my_prefix_add_rest_orderby_params', 10, 1);

function my_prefix_add_rest_orderby_params($params)
{
    $params['orderby']['enum'][] = 'menu_order';
    //echo json_encode($params, true);
    //die();
    return $params;
}

add_filter('rest_endpoints', function ($routes) {

    foreach (['guidelines', 'search'] as $type) {
        if (!($route = &$routes['/wp/v2/' . $type])) {
            continue;
        }

        // Allow ordering by my meta value
        $route[0]['args']['orderby']['enum'][] = 'menu_order';

        // Allow only the meta keys that I want
        $route[0]['args']['meta_key'] = array(
            'description' => 'The meta key to query.',
            'type' => 'string',
            'enum' => ['menu_order'],
            'validate_callback' => 'rest_validate_request_arg',
        );
    }

    return $routes;

    /*if (!($route =& $routes['/wp/v2/guidelines']) && !($route =& $routes['/wp/v2/search'])) {
return $routes;
}
//var_dump($route[0]['args']['orderby']['enum']);
$route[0]['args']['orderby']['enum'][] = 'menu_order';
$route[0]['args']['meta_key'] = array(
'description'       => 'The meta key to query.',
'type'              => 'string',
'enum'              => ['menu_order'],
'validate_callback' => 'rest_validate_request_arg',
);
//var_dump($route[0]['args']['orderby']['enum']);
return $routes;*/

});

add_action('rest_api_init', function () {
    register_rest_route('search', '/all', array(
        'methods' => 'GET',
        'callback' => 'get_all_posts',
    ));
});

function get_all_posts($request)
{

    $parameters = $request->get_params();
	$result = array();

    if (isset($parameters['s'])) {
		$s = $parameters['s'];
		$p = (isset($parameters['p'])) ? (int) $parameters['p'] : 1;
        if ($s !== '') {
            $query = new WP_Query(
                array(
					'posts_per_page' => 20,
					'paged' => $p,
                    's' => $s,
                )
			);
			
			foreach($query->posts as $post){
				$formatedPost = [
					'id' => $post->ID,
					'title' => $post->post_title,
					'date' => $post->post_date,
					'content' => $post->post_content //truncate(trim(strip_tags($post->post_content)), 200, false),
				];
				
				$result[] = $formatedPost;
			}
        }
    }

    return new WP_REST_Response(['result' => $result], 200);
}


function truncate($string, $length, $html = true)
{
    if (strlen($string) > $length) {
        if ($html) {
            // Grabs the original and escapes any quotes
            $original = str_replace('"', '\"', $string);
        }

        // Truncates the string
        $string = substr($string, 0, $length);

        // Appends ellipses and optionally wraps in a hoverable span
        if ($html) {
            $string = '<span title="' . $original . '">' . $string . '&hellip;</span>';
        } else {
            $string .= '...';
        }
    }

    return $string;
}