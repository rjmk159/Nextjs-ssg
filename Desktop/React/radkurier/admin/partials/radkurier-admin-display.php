<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       itsjunaid.com
 * @since      1.0.0
 *
 * @package    Radkurier
 * @subpackage Radkurier/admin/partials
 */
?>

<style>
  html, body {
    font-family: Roboto, Arial, sans-serif;
    font-size: 15px;
  }
  form {
    border: 5px solid #f1f1f1;
    max-width:700px;
    margin-top:20px
  }
  input[type=text], input[type=password], input[type=number] {
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
    margin: 24px 50px 12px;
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
    margin: 24px 50px 12px;
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
  @media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
}
</style>
    <form class="widgets-holder-wrap" method="post" post="options.php">
    <?php wp_nonce_field('update-options') ?>
      <div class="icon">
        <img src="<?php echo plugin_dir_url( __FILE__ ) ?>/images/logo.png"/>
      </div>
      <div class="formcontainer">
      <div class="container">
        <label for="uname"><strong>Map API Key</strong></label>
        <input type="text" placeholder="Enter Google Maps Api Key here" value="<?php echo get_option('key'); ?>" name="key" required>
        <label for="mail"><strong>Refresh Map in </strong></label>
        <input type="number" value="<?php echo get_option('delay'); ?>" placeholder="Enter Value in millisecs e.g, 500, 1000, 1500" name="delay" required>
      </div>
	  <p><input type="submit" class="buttons" name="Submit" value="Submit" /></p>
            <input type="hidden" name="action" value="update" />
            <input type="hidden" name="page_options" value="time" />
      </form>