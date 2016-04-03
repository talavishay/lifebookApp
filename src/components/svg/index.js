'use strict',

/** drupal8 
 * @file Drupal\app\Plugin\rest\resource;
 * @RestResource(
 *   id = "svg_resource",
 *   label = @Translation("Svg resource"),
 *   uri_paths = {
 *     "canonical" = "/lifebook/clipart/{root}/{dir}"
 *   }
 * )
 */
App.svg = {
	urlRoot : '/lifebook/clipart/svg',
	urlTail : '?_format=json',
	collectionUrl : '/lifebook/clipart/svg_root?_format=json'
},

module.exports = require("./filesCompositeView.js");
