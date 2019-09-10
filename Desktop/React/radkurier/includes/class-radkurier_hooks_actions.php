<?php

/**
 * Fired during plugin activation
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    radkurier
 * @subpackage radkurier/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    radkurier
 * @subpackage radkurier/includes
 * @author     Your Name <email@example.com>
 */
class radkurier_hooks_actions {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
    public function __construct()
    {
		add_shortcode('radkurier-tracking-map', array($this, 'addMaptoSection'));
		add_filter('user_contactmethods', array($this,'modify_contact_methods'));
		add_filter( 'jwt_auth_token_before_dispatch', array($this,'radkurier_auth_function'), 10, 2 );
		add_action( 'init',  array($this,'my_biker_cpt') );
		add_action('admin_init', array($this,'add_user_meta_boxes')); 
		add_action('save_post', array($this,'save_user_info'));
		add_action('rest_api_init',array($this,'register_custom_fields'));

    }


	public function radkurier_auth_function($data, $user) { 
		$data['user_role'] = $user->roles; 
		$data['user_id'] = $user->ID; 
		$data['city'] = $user->city; 
		$data['phone'] = $user->phone; 
		$data['currentStatus'] = $user->currentStatus; 
		$data['trackingId'] = $user->trackingId; 
		$data['avatar']= get_avatar_url($user->ID);
		return $data; 
	} 

	public function addMaptoSection( $atts, $content = null ) {
		$a = shortcode_atts( array(
			'latitude' => '',
			'longitude'  =>  '',
			'width' =>  '',
			'height' =>'',
		), $atts );
		return '</style><div id="map-canvas" data-latitude="'.esc_attr($a['latitude']).'" data-longitude="'. esc_attr($a['longitude']) .'" style="width:' . esc_attr($a['width']) . ';height:'. esc_attr($a['height']) . '"></div>';		
	}

	function modify_contact_methods($profile_fields) {
		$profile_fields['city'] = 'City';
		$profile_fields['phone'] = 'Phone';
		$profile_fields['currentStatus'] = 'Current Status    (0:Available,1:Available on Tour,2:unavailable)';
		$profile_fields['trackingId'] = 'Tracking Id';
		unset($profile_fields['aim']);
		return $profile_fields;
	}


public function my_biker_cpt() {
    $args = array(
	  'public'       => true,
	  'supports'            => array( 'revisions'),
      'show_in_rest' => true,
      'label'        => 'Bikers',
		   'show_in_menu'        => false,
        'show_in_nav_menus'   => false,
		    'show_in_admin_bar'   => false
    );
	register_post_type( 'biker', $args );	
}


public function register_custom_fields(){
	register_rest_field(
		'biker',
		'user_details',
		array(
			'get_callback'=> array($this,'show_fields'),
			'update_callback'=> array($this,'update_fields'),
		)
	);
	register_rest_field(
		'biker',
		'user_name',
		array(
			'get_callback'=> array($this,'show_fields'),
			'update_callback'=> array($this,'update_fields'),
		)
	);
	register_rest_field(
		'biker',
		'user_phone',
		array(
			'get_callback'=> array($this,'show_fields'),
			'update_callback'=> array($this,'update_fields'),
		)
	);
	register_rest_field(
		'biker',
		'user_email',
		array(
			'get_callback'=> array($this,'show_fields'),
			'update_callback'=> array($this,'update_fields'),
		)
	);
	register_rest_field(
		'biker',
		'user_status',
		array(
			'get_callback'=> array($this,'show_fields'),
			'update_callback'=> array($this,'update_fields'),
		)
	);
	register_rest_field(
		'biker',
		'user_latitude',
		array(
			'get_callback'=> array($this,'show_fields'),
			'update_callback'=> array($this,'update_fields'),
		)
	);
	register_rest_field(
		'biker',
		'user_longitude',
		array(
			'get_callback'=> array($this,'show_fields'),
			'update_callback'=> array($this,'update_fields'),
		)
	);
	register_rest_field(
		'biker',
		'user_image',
		array(
			'get_callback'=> array($this,'show_fields'),
			'update_callback'=> array($this,'update_fields'),
		)
	);
	register_rest_field(
		'user',
		'city',
		array(
			'get_callback'=> array($this,'show_author_fields'),
			'update_callback'=> array($this,'update_author_fields'),
		)
	);
	register_rest_field(
		'user',
		'phone',
		array(
			'get_callback'=> array($this,'show_author_fields'),
			'update_callback'=> array($this,'update_author_fields'),
		)
	);
	register_rest_field(
		'user',
		'currentStatus',
		array(
			'get_callback'=> array($this,'show_author_fields'),
			'update_callback'=> array($this,'update_author_fields'),
		)
	);
		register_rest_field(
		'user',
		'trackingId',
		array(
			'get_callback'=> array($this,'show_author_fields'),
			'update_callback'=> array($this,'update_author_fields'),
		)
	);
}


public  function show_fields($object,$field,$request){
	return get_post_meta($object['id'],$field_name,false);
}
public  function update_fields($value, $object, $field){
	return update_post_meta($object->ID, $field, $value);
}
public  function show_author_fields($object, $field, $request){
	return get_the_author_meta($field,$object['id']);
}
public  function update_author_fields($value, $object, $field){
	return update_user_meta($object->ID,$field,$value);
}


public  function add_user_meta_boxes(){
  add_meta_box('user_name-meta1', 'User Name', array($this,'meta_box_user_name'), 'biker', 'normal', 'low');
  add_meta_box('user_name-meta2', 'User Phone', array($this,'meta_box_user_phone'), 'biker', 'normal', 'low');
  add_meta_box('user_name-meta3', 'User email', array($this,'meta_box_user_email'), 'biker', 'normal', 'low');
  add_meta_box('user_name-meta4', 'User Status', array($this,'meta_box_user_status'), 'biker', 'normal', 'low');
  add_meta_box('user_name-meta5', 'User Latitude', array($this,'meta_box_user_latitude'), 'biker', 'normal', 'low');
  add_meta_box('user_name-meta6', 'User Longitude', array($this,'meta_box_user_longitude'), 'biker', 'normal', 'low');
  add_meta_box('user_name-meta7', 'User Image', array($this,'meta_box_user_image'), 'biker', 'normal', 'low');

}
public function meta_box_user_name(){
	global $post;
	$custom = get_post_custom($post->ID);
	$user_name = $custom['user_name'][0];
	?>
	<input name='user_name' value='<?php echo $user_name; ?>' />
	<?php
  }
  public function meta_box_user_image(){
	global $post;
	$custom = get_post_custom($post->ID);
	$user_image = $custom['user_image'][0];
	?>
	<input name='user_image' value='<?php echo $user_image; ?>' />
	<?php
  }
  public function meta_box_user_phone(){
	global $post;
	$custom = get_post_custom($post->ID);
	$user_phone = $custom['user_phone'][0];
	?>
	<input name='user_phone' value='<?php echo $user_phone; ?>' />
	<?php
  }
  public function meta_box_user_email(){
	global $post;
	$custom = get_post_custom($post->ID);
	$user_email = $custom['user_email'][0];
	?>
	<input name='user_email' value='<?php echo $user_email; ?>' />
	<?php
  }
  public function meta_box_user_status(){
	global $post;
	$custom = get_post_custom($post->ID);
	$user_status = $custom['user_status'][0];
	?>
	<input name='user_status' value='<?php echo $user_status; ?>' />
	<?php
  }

  public function meta_box_user_latitude(){
	global $post;
	$custom = get_post_custom($post->ID);
	$user_latitude = $custom['user_latitude'][0];
	?>
	<input name='user_latitude' value='<?php echo $user_latitude; ?>' />
	<?php
  }
  public function meta_box_user_longitude(){
	global $post;
	$custom = get_post_custom($post->ID);
	$user_longitude = $custom['user_longitude'][0];
	?>
	<input name='user_longitude' value='<?php echo $user_longitude; ?>' />
	<?php
  }

  public function save_user_info(){
  global $post;
  update_post_meta($post->ID, 'user_name', $_POST['user_name']);  
  update_post_meta($post->ID, 'user_phone', $_POST['user_phone']);    
  update_post_meta($post->ID, 'user_email', $_POST['user_email']);  
  update_post_meta($post->ID, 'user_status', $_POST['user_status']);    
  update_post_meta($post->ID, 'user_latitude', $_POST['user_latitude']);  
  update_post_meta($post->ID, 'user_longitude', $_POST['user_longitude']);    
  update_post_meta($post->ID, 'user_image', $_POST['user_image']);    
}

}
