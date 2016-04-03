'use strict',
App.mask = {

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
	urlRoot : '/lifebook/clipart/svg/mask',

	urlTail : '?_format=json',
	collectionUrl : '/lifebook/clipart/svg_mask?_format=json'
},

module.exports = require("./maskBrowser.js");
