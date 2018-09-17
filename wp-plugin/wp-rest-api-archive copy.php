<?php

/**
 * @wordpress-plugin
 * Plugin Name:       WP Rest API Archive
 * Plugin URI:        https://github.com/leoruhland/wp-rest-api-archive
 * Description:       List archive of posts in Rest API
 * Version:           1.0.0
 * Author:            Leonardo Ruhland
 * Author URI:        https://github.com/leoruhland
 * License:           MIT
 */

add_action('rest_api_init', 'wp_archive_action');

function wp_archive_action()
{
    register_rest_route('wp-archive/v1', '/archive', array(
        'methods' => 'GET',
        'callback' => 'wp_archive_callback',
    ));
}

function wp_get_archive_filter()
{

}

function wp_archive_callback()
{
    //add_filter('get_archives_link', 'wp_get_archive_filter', 10, 2);

    $data = wp_get_array_archives(array(
        'type' => 'daily',
        'show_post_count' => true,
        //'limit' => 800,
        'post_type' => 'news',
        'format' => 'custom',
        'echo' => false,
        'before' => '',
        'after' => '',
    ));

    //remove_filter('get_archives_link', 'wp_get_archive_filter', 10, 2);

    $response = new WP_REST_Response($data);
    return $response;
}

function wp_get_array_archives($args = '')
{
    global $wpdb, $wp_locale;

    $result = array();

    $defaults = array(
        'type' => 'monthly', 'limit' => '',
        'format' => 'html', 'before' => '',
        'after' => '', 'show_post_count' => false,
        'echo' => 1, 'order' => 'DESC',
        'post_type' => 'post',
    );

    $r = wp_parse_args($args, $defaults);

    $post_type_object = get_post_type_object($r['post_type']);
    if (!is_post_type_viewable($post_type_object)) {
        return;
    }
    $r['post_type'] = $post_type_object->name;

    if ('' == $r['type']) {
        $r['type'] = 'monthly';
    }

    if (!empty($r['limit'])) {
        $r['limit'] = absint($r['limit']);
        $r['limit'] = ' LIMIT ' . $r['limit'];
    }

    $order = strtoupper($r['order']);
    if ($order !== 'ASC') {
        $order = 'DESC';
    }

    $archive_week_separator = '&#8211;';
    $sql_where = $wpdb->prepare("WHERE post_type = %s AND post_status = 'publish'", $r['post_type']);
    $where = apply_filters('getarchives_where', $sql_where, $r);
    $join = apply_filters('getarchives_join', '', $r);

    $output = [];

    $last_changed = wp_cache_get_last_changed('posts');

    $limit = $r['limit'];

    $query = "SELECT YEAR(post_date) AS `year`, MONTH(post_date) AS `month`, DAYOFMONTH(post_date) AS `dayofmonth`, count(ID) as posts FROM $wpdb->posts $join $where GROUP BY YEAR(post_date), MONTH(post_date), DAYOFMONTH(post_date) ORDER BY post_date $order $limit";
    $key = md5($query);
    $key = "wp_get_archives:$key:$last_changed";
    if (!$results = wp_cache_get($key, 'posts')) {
        $results = $wpdb->get_results($query);
        wp_cache_set($key, $results, 'posts');
    }
    if ($results) {
        $after = $r['after'];
        foreach ((array) $results as $result) {
            $url = get_day_link($result->year, $result->month, $result->dayofmonth);
            if ('post' !== $r['post_type']) {
                $url = add_query_arg('post_type', $r['post_type'], $url);
            }
            $date = sprintf('%1$d-%2$02d-%3$02d 00:00:00', $result->year, $result->month, $result->dayofmonth);
            $text = mysql2date(get_option('date_format'), $date);
            if ($r['show_post_count']) {
                $r['after'] = '&nbsp;(' . $result->posts . ')' . $after;
            }
            //$output[] = get_archives_link( $url, $text, $r['format'], $r['before'], $r['after'] );
            $output[] = [
				//'url' => $url,
				'text' => $text,
				'date' => [$result->year, $result->month, $result->dayofmonth],
				//'count' => $result->posts,
			];
        }
    }

    if ($r['echo']) {
        echo $output;
    } else {
        return $output;
    }
}
