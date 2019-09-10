<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       itsjunaid.com
 * @since      1.0.0
 *
 * @package    Radkurier
 * @subpackage Radkurier/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Radkurier
 * @subpackage Radkurier/admin
 * @author     Raja Junaid <rjmk159@gmail.com>
 */
class Radkurier_Admin {

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
 * @param      string    $plugin_name       The name of this plugin.
 * @param      string    $version    The version of this plugin.
 */
public function __construct( $plugin_name, $version ) {

  $this->plugin_name = $plugin_name;
  $this->version = $version;
  add_action('admin_menu',array($this ,'add_admin_pages'));

}

/**
 * Register the stylesheets for the admin area.
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

  wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/radkurier-admin.css', array(), $this->version, 'all' );

}

/**
 * Register the JavaScript for the admin area.
 *
 * @since    1.0.0
 */
public function enqueue_scripts() {

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

  wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/radkurier-admin.js', array( 'jquery' ), $this->version, false );
}
public function add_admin_pages()
  {
    add_menu_page('Radkurier Plugin', 'Radkurier', 'administrator', __FILE__, 'radkurier_settings_page' , 'dashicons-location', 90 );
    add_action( 'admin_init', 'register_radkurier_settings' );  

  }

}

function register_radkurier_settings() {
  register_setting( 'radkurier-settings-group', 'delay' );
  register_setting( 'radkurier-settings-group', 'key' );
}

function radkurier_settings_page() {
?>
  <style>
    html, body {
      font-family: Roboto, Arial, sans-serif;
      font-size: 15px;
    }
    .wrap {
    margin: 10px 20px 0 2px;
    width: auto;
    min-width: 45%;
    height: 100%;
}
    form {
      border: 5px solid #f1f1f1;
      max-width:700px;
    }
    input[type=text], input[type=password], input[type=number],.shortcode {
      width: 100%;
      padding: 16px 10px;
      margin: 8px 0;
      height:53px;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }
    .icon {
      font-size: 110px;
      display: flex;
      color: #4286f4;
      margin: 20px;
      }
    .icon img {
        max-width:200px
    }
    .buttons {
      background-color: #4286f4;
      color: white;
      padding: 14px 0;
      border: none;
      cursor: grab;
      width: 48%;
      float:left;
    }
    h1 {
      text-align:center;
      font-size:18;
    }
    .buttons:hover {
      opacity: 0.8;
    }
    .formcontainer {
      text-align: center;
      margin: 20px;
    }
    .container {
      padding: 16px 0;
      text-align:left;
    }
    span.psw {
      float: right;
      padding-top: 0;
      padding-right: 15px;
    }
    .p-20{
      padding:20px
    }
    .icon-logo{
      max-width:100px;
    }
    .flex-center{
      display: flex;
      flex-wrap: wrap;
    }
    @media screen and (max-width: 300px) {
      span.psw {
        display: block;
        float: none;
      }
    }
  </style>
 <div class="flex-center"> 
  <div class="wrap">
    <form class="widgets-holder-wrap" method="post" action="options.php">
      <?php settings_fields( 'radkurier-settings-group' ); ?>
      <?php do_settings_sections( 'radkurier-settings-group' ); ?>
        <div class="icon">
          <img src="<?php echo plugin_dir_url( __FILE__ ) ?>images/logo.png"/>
        </div>
        <div class="formcontainer">
          <div class="container">
            <label for="uname"><strong>Map API Key</strong></label>
            <input type="text" placeholder="Enter Google Maps Api Key here" name="key" value="<?php echo esc_attr( get_option('key') ); ?>" />
            <label for="mail"><strong>Refresh Map in </strong></label>
            <input placeholder="Enter Value in millisecs e.g, 500, 1000, 1500" type="number" name="delay" value="<?php echo esc_attr( get_option('delay') ); ?>" />
            <p><?php submit_button(); ?></p>
          </div>
      </div>
    </form>
  </div>
    <div class="wrap">
      <div class="widgets-holder-wrap p-20">
        <img class="icon-logo" src="<?php echo plugin_dir_url( __FILE__ ) ?>images/icon.svg"/>
        <?php $error_message = '<p>' . esc_html__( 'This plugin requires ', 'simplewlv' ) . '<a href="' . esc_url( 'https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/' ) . '">JWT Authentication for WP REST API</a>' . esc_html__( ' plugin to be active.', 'simplewlv' ) . '</p>';
        echo $error_message; ?>
        <img class="icon-logo" src="<?php echo plugin_dir_url( __FILE__ ) ?>images/rest.png"/>
        <?php $error_message = '<p>' . esc_html__( 'This plugin requires ', 'simplewlv' ) . '<a href="' . esc_url( 'https://wordpress.org/plugins/rest-api/' ) . '">WordPress REST API </a>' . esc_html__( ' plugin to be active.', 'simplewlv' ) . '</p>';
        echo $error_message; ?>

      </div>
  </div> 
  <div class="wrap"  style="width:100%">
      <div class="widgets-holder-wrap p-20" >
       <p>Please Copy the shortcode and change width, height, longitude and latitude after filling the above map key and map refresh secs</p>
       <label for="uname"><strong>Shortcode</strong></label>
       <p class="shortcode">[radkurier-tracking-map width="100%" height="70vh" latitude="12.107900" longitude="77.885063" ]</p>
      </div>
  </div> 
 </div>
<?php } 


