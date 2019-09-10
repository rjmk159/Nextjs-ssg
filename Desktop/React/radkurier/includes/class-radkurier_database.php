<?php

/**
 * Fired during plugin activation
 *
 * @link       http://example.com
 * @since      1.0.0
 *
 * @package    web3_painting
 * @subpackage web3_painting/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    web3_painting
 * @subpackage web3_painting/includes
 * @author     Your Name <email@example.com>
 */
class radkurier_Database {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
    public function __construct()
    {  
        if ( defined( 'radkurier_VERSION' ) ) {
			$this->version = radkurier_VERSION;
		} else {
			$this->version = '1.0.0';
        }
        /*
        * All Ajax Call Hooks For manipulatng database
        */
        add_action('after_setup_theme', array($this,'locationTable'));
        register_activation_hook(__FILE__, array($this,'locationTable'));

        // add_action('wp_ajax_post_word_count', array($this,'post_word_count'));
        // add_action('wp_ajax_nopriv_post_word_count', array($this,'post_word_count'));

        // add_action('wp_ajax_role_update', array($this,'role_update'));
        // add_action('wp_ajax_nopriv_role_update', array($this,'role_update'));

        // add_action('wp_ajax_role_delete', array($this,'role_delete'));
        // add_action('wp_ajax_nopriv_role_delete', array($this,'role_delete'));

        // register_activation_hook(__FILE__, array($this,'tokenDataInsert'));
        // register_activation_hook(__FILE__, array($this,'db_update'));
        // register_activation_hook(__FILE__, array($this,'price_update'));
        // register_activation_hook(__FILE__, array($this,'painting_roles_insert'));
        // register_activation_hook(__FILE__, array($this,'updateAllEntries'));

    }
    
    
    public function locationTable()
    {
        global $wpdb;
        global $a1Cos_database_version;
        $a1Cos_database_version = '1.10';
        $table = $wpdb->prefix . "locations";
        $charset_collate= $wpdb->get_charset_collate();
        $sql= "CREATE TABLE $table(
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_name varchar(200) NOT NULL,
            user_email varchar(200),
            modified_timestamp varchar(200),
            user_status varchar(1),
            user_image varchar(15),
            latitude varchar(30),
			longitude varchar(30),
            PRIMARY KEY  (id)
        ) $charset_collate;";
        require_once(ABSPATH . '/wp-admin/includes/upgrade.php');
        dbdelta($sql);
    }


/***************** ::Role Insert and Update :: *******************************/
function post_word_count(){    
    $name = $_POST['transactionhash'];
    $address = $_POST['address']; 
    $rolename = $_POST['rolename'];  
    $activestatus = $_POST['activestatus']; 
    global $wpdb;
    $table = $wpdb->prefix.'painting_roles'; 
    $wpdb->insert( 
        $table, 
        array( 
        'transaction_hash' => $name,  
        'role_address' =>  $address,
        'active_status' =>  $activestatus,
        'role_name' => $rolename,
        'tx_status' => 'pending'  
        ), array(
            '%s',
            '%s'
        )
    );
    echo $rolename." Inserted Successfull";
    die();    
    return true;
    }
    function role_update()
    {
        $transactionhash   = $_POST['transactionhash'];
        $modifiedtimestamp = date("D M d, Y G:i");
        global $wpdb;
        $table = $wpdb->prefix.'painting_roles';
        $wpdb->query($wpdb->prepare("UPDATE $table
            SET modified_timestamp = %s,
            active_status = %s,
            tx_status = %s
            WHERE transaction_hash = %s", date("D M d, Y G:i"), true, 'approved', $transactionhash));
            echo "Today is " . date("D M d, Y G:i") ;
        die();
        return true;
    }
    
   
    function role_delete()
    {
        $address   = $_POST['address'];
        $role   = $_POST['role'];
        $txHash   = $_POST['transactionHash'];
        global $wpdb;
        $table = $wpdb->prefix.'painting_roles';    
        $result = $wpdb->get_results( 
        $wpdb->prepare( "
            SELECT * FROM $table 
            WHERE role_address = %s AND role_name =%s", 
            $address, $role 
            ) 
            );
            if(sizeof($result)>0){
                $wpdb->query($wpdb->prepare("UPDATE $table
                    SET modified_timestamp = %s,
                    active_status = %s,
                    tx_status = %s
                    WHERE role_address = %s", date("D M d, Y G:i"), -1 , 'pending', $address ));
                    echo "Updated Removed Role" ; 
                }
            else{
            $wpdb->insert( 
                $table, 
                array( 
                    'transaction_hash' => $txHash,  
                    'role_address' =>  $address,
                    'active_status' =>  -1,
                    'modified_timestamp'=>date("D M d, Y G:i"), 
                    'role_name' => $role,
                    'tx_status' => 'pending'  
                )
            );
            echo $rolename." Inserted Removed Role Successfull";   
            die();
            return true;
    	}  
	}  
}
$plugin = new radkurier_Database();
