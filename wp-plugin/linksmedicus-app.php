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

function add_custom_data() {
	register_rest_field('category', 'img', array(
		'get_callback' => 'get_image_data',
		'schema' => array(
			'description' => 'Image from category',
			'type' => 'string',
			'context' => array('view', 'edit')
		)
	));

	register_rest_field('category', 'nomepc', array(
		'get_callback' => 'get_nomepc_data',
		'schema' => array(
			'description' => 'Nome PC',
			'type' => 'string',
			'context' => array('view', 'edit')
		)
	));

	register_rest_field('post', 'desc', array(
		'get_callback' => 'get_desc_data',
		'schema' => array(
			'description' => 'Descrição',
			'type' => 'string',
			'context' => array('view', 'edit')
		)
	));

	register_rest_field('post', 'url', array(
		'get_callback' => 'get_link_data',
		'schema' => array(
			'description' => 'Link',
			'type' => 'string',
			'context' => array('view', 'edit')
		)
	));

	register_rest_field('guidelines', 'guidelines', array(
		'get_callback' => 'get_guideline_data',
		'schema' => array(
			'description' => 'Guideline',
			'type' => 'object',
			'context' => array('view')
		)
	));

	register_rest_field('search', 'url', array(
		'get_callback' => 'get_searchlink_data',
		'schema' => array(
			'description' => 'Link',
			'type' => 'string',
			'context' => array('view', 'edit')
		)
	));
}

function get_searchlink_data($object, $field_name, $request) {
	if (function_exists('get_field')) {
		return get_field('search', $object['id']);
	}
}

function get_guideline_data($object, $field_name, $request) {
	if (function_exists('get_field')) {
		return get_field('001', $object['id']);
	}
}

function get_link_data($object, $field_name, $request) {
	if (function_exists('get_field')) {
		return get_field('link', $object['id']);
	}
}

function get_desc_data($object, $field_name, $request) {
	if (function_exists('get_field')) {
		return get_field('descric', $object['id']);
	}
}


function get_image_data($object, $field_name, $request) {
	if (function_exists('z_taxonomy_image_url')) {
		return z_taxonomy_image_url($object['id']);
	}
}

function get_nomepc_data($object, $field_name, $request) {
	if (function_exists('the_field')) {
		return get_field('nome_pc', 'category_'.$object['id']);
	}
}


add_action( 'init', 'my_custom_post_type_rest_support', 25 );
function my_custom_post_type_rest_support() {
  global $wp_post_types;
 
  //be sure to set this to the name of your post type!
  $post_type_name = 'search';
  if( isset( $wp_post_types[ $post_type_name ] ) ) {
    $wp_post_types[$post_type_name]->show_in_rest = true;
    $wp_post_types[$post_type_name]->rest_base = $post_type_name;
  }
}