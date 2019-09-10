<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       itsjunaid.com
 * @since      1.0.0
 *
 * @package    Radkurier
 * @subpackage Radkurier/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Radkurier
 * @subpackage Radkurier/public
 * @author     Raja Junaid <rjmk159@gmail.com>
 */
class Radkurier_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;
		add_role(
			'radBiker',
			__( 'Biker New' ),
			array(
				'edit_theme_options' => true,
				'delete_others_pages' => true,
				'delete_others_posts' => true,
				'delete_pages' => true,
				'delete_posts' => true,
				'delete_private_pages' => true,
				'delete_private_posts' => true,
				'delete_published_pages' => true,
				'delete_published_posts' => true,
				'edit_others_pages' => true,
				'edit_others_posts' => true,
				'edit_pages' => true,
				'edit_posts' => true,
				'edit_private_pages' => true,
				'edit_private_posts' => true,
				'edit_published_pages' => true,
				'edit_published_posts' => true,
				'manage_categories' => true,
				'manage_links' => true,
				'moderate_comments' => true,
				'publish_pages' => true,
				'publish_posts' => true,
				'read' => true,
				'read_private_pages' => true,
				'read_private_posts' => true,
				'unfiltered_html' => true,
				'upload_files' => true
			)
		);
 
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Radkurier_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Radkurier_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/radkurier-public.css', array(), $this->version, 'all' );

	}


	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		$key = esc_attr( get_option('key') );
		$delay =  esc_attr( get_option('delay') );
		// ?key='.$key.'
		wp_enqueue_script( 'map', 'https://maps.googleapis.com/maps/api/js?key='.$key.'&sensor=false');
		wp_enqueue_script( 'jq', 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js');
		wp_register_script( 'radkurier_plugin_map', plugin_dir_url( __FILE__ ) . 'js/radkurier-public.js', array( 'jq' ), null, false );
		$translation_array = array(
			'pluginUrl' =>  plugin_dir_url( __FILE__ ),
			'delay' => $delay
		);
		wp_localize_script( 'radkurier_plugin_map', 'radObj', $translation_array );
		wp_enqueue_script( 'radkurier_plugin_map' );
	}



	




}
