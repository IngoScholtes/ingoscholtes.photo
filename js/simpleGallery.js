/*
* SimpleGallery V1.0
* Copyright 2012-2018, Ingo Scholtes
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 3/4/2019
*/

var shopEnabled = false

// This function generates a customizable image tile that links to a gallery page.
// ===
// Parameter description:
// ===
// pictureSrc: 	the src of the image to show as tile
// altText: the alternative text to add to the image element
// footerText: caption text to show in a semi-transparent footer
// galleryURL: url of page to open when tile is clicked
// divID: ID of the div to add the tile to, default is 'galleryRoot'
// panoramic: whether or not to generate a panoramic tile (twice the size of a normal one)
function addGalleryTile(pictureSrc, altText, footerText, galleryURL, divID, panoramic) {
	"use strict";
	if (typeof panoramic === 'undefined')
	{
		panoramic = false;
	}
		
	if (typeof divID === 'undefined')
	{
		divID = 'galleryRoot';
	}
	
	var imageTile = document.createElement('div');
	
	if (panoramic)
	{
		imageTile.setAttribute('class', 'imageTilePano');
	}
	else
	{
		imageTile.setAttribute('class', 'imageTile');
	}
	
	var image = document.createElement('div');
	if (panoramic)
	{
		image.setAttribute('class', 'imagePano');	
	}
	else
	{
		image.setAttribute('class', 'image');
	}
	imageTile.appendChild(image);	

	var href = document.createElement('a');
	href.setAttribute('href', galleryURL);
	
	var img = document.createElement('img');
	img.setAttribute('src', pictureSrc);
	img.setAttribute('alt', altText);	

	image.appendChild(href);
	href.appendChild(img);		
	
	var footer = document.createElement('div');
	
	if (panoramic)
	{
		footer.setAttribute('class', 'footerPano');
	}
	else 
	{
		footer.setAttribute('class', 'footer');
	}
	footer.appendChild(document.createTextNode(footerText));
	imageTile.appendChild(footer);
	
	document.getElementById(divID).appendChild(imageTile);
}


// This function generates an image tile, which shows the underlying picture in full size when it is clicked
// ===
// Parameter description:
// ===
// pictureSrc: 	the src of the image to show as tile
// pictureTitle: the title of the picture, will also be used as alternative text and as caption of full-size display
// footerText: a subtitle with additional information
// divID: ID of the div to add the tile to, default is 'galleryRoot'
// panoramic: whether or not to generate a panoramic tile (twice the size of a normal one)
// printID: ID of the picture on 500pxart.com, will be used to generate a 'Buy' button
function addImageTile(pictureSrc, pictureTitle, footerText, divID, panoramic, fhpID, printID) {
	"use strict";
	if (typeof panoramic === 'undefined')
	{
		panoramic = false;
	}
		
	if (typeof divID === 'undefined')
	{
		divID = 'galleryRoot';
	}
		
	if (typeof printID === 'undefined')
	{
		printID = '';
	}
		
	if (typeof fhpID === 'undefined')
	{
		fhpID = '';
	}
	
	// Create imageTile and image divs
	var imageTile = document.createElement('div');
	if (panoramic)
	{
		imageTile.setAttribute('class', 'imageTilePano');	
	}
	else 
	{
		imageTile.setAttribute('class', 'imageTile');
	}
	
	var image = document.createElement('div');
	if (panoramic)
	{
		image.setAttribute('class', 'imagePano');	
	}
	else	
	{
		image.setAttribute('class', 'image');
	}
	imageTile.appendChild(image);
	
	// Add image
	var img = document.createElement('img');
	img.setAttribute('src', pictureSrc);
	img.setAttribute('alt', pictureTitle);
	img.setAttribute('id', pictureTitle);
	img.setAttribute('title', pictureTitle);
	
	// set call to showFullImage when image is clicked
	img.setAttribute('onclick', 'showFullImage("'+pictureSrc+'","'+ pictureTitle + '","' + footerText+'","' + fhpID + '","' + printID +'");');

	image.appendChild(img);
	
	// Create a div for the footer and make it appear on mouse hover
	var footer = document.createElement('div');
	if (panoramic)
	{
		footer.setAttribute('class', 'hoverFooterPano');	
	}
	else	
	{
		footer.setAttribute('class', 'hoverFooter');
	}
		
	// Add title to footer and append footer to imageTile
	footer.appendChild(document.createTextNode(pictureTitle));
	imageTile.appendChild(footer);
	
	// Create additional div overlay to show Sale button
	var buyFooter = document.createElement('div');
	if (panoramic)
	{
		buyFooter.setAttribute('class', 'buyFooterPano');	
	}
	else	
	{
		buyFooter.setAttribute('class', 'buyFooter');
	}
	
	 // Add Sale Button, if this picture has a printID
	 if (printID !== '' && shopEnabled)
	 {
		 var cartimg = document.createElement('img');
		 cartimg.setAttribute('src', '/img/basket.gif');
		 cartimg.setAttribute('style', 'width:15px');		 
		 buyFooter.appendChild(cartimg);		 		 
	 }
	 
	 // set calls to showFullImage when footers are clicked
	 buyFooter.setAttribute('onclick', "showFullImage('"+pictureSrc+"','"+ pictureTitle + "','"+footerText+"','" + fhpID + "','" + printID +"');"); 
	 footer.setAttribute('onclick', "showFullImage('"+pictureSrc+"','"+ pictureTitle + "','"+footerText+"','" + fhpID + "','" + printID +"');");

		 
	 imageTile.appendChild(buyFooter);
	 
	 // Add imageTile to the root div provided by the user
	 document.getElementById(divID).appendChild(imageTile);
}


// This function shows a semi-transparent overlay which shows the specified image in ful size
// ===
// Parameter description:
// ===
// pictureSrc: 	the src of the image to show as tile
// pictureTitle: the title of the picture, will also be used as alternative text and as caption of full-size display
// footerText: a subtitle with additional information
// printID: ID of the picture on 500pxart.com, will be used to generate a 'Buy' button
function showFullImage(pictureSrc, pictureTitle, footerText, fhpID, printID) {	
	"use strict";
	if (typeof printID === 'undefined')
	{
		printID = '';
	}
	if (typeof fhpID === 'undefined')
	{
		fhpID = '';
	}

	 var overlay = document.createElement("div");
	 overlay.setAttribute('id', 'overlay');
	 overlay.setAttribute('class', 'pictureOverlay');
	 overlay.setAttribute('onClick', 'hideOverlay()');

    var span = document.createElement('span');
	span.setAttribute('class', 'helper');		
	 
	 var img = document.createElement('img');
	 img.setAttribute('class', 'pictureOverlayImg');		 
	 img.setAttribute('src', pictureSrc);
	 img.setAttribute('alt', pictureTitle);
	 img.setAttribute('title', pictureTitle);
	 
	 var imgInfo = document.createElement('div');
	 imgInfo.setAttribute('class', 'pictureOverlayInfo');
	 imgInfo.appendChild(document.createTextNode(pictureTitle));
	 imgInfo.appendChild(document.createElement('br'));
	 
	 var desc = document.createElement('span');
	 desc.setAttribute('style', 'color:#999;font-style:italic;');
	 desc.appendChild(document.createTextNode(footerText));
	 imgInfo.appendChild(desc);
	 
	 var l = '';
	 
	 var buyInfo = document.createElement('div');
	 buyInfo.setAttribute('class', 'buyOverlay');
	 
	 if (printID !== '' && shopEnabled)
	 {
		 var cartimg = document.createElement('img');
		 cartimg.setAttribute('src', '/img/basket.gif');
		 cartimg.setAttribute('style', 'width:20px');
		 var buylink = document.createElement('a');
		 l = '/' + printID;
		 buylink.setAttribute('href', l);
		 buylink.setAttribute('class', 'buylink');  
		 buylink.appendChild(cartimg);		 
		 buylink.appendChild(document.createTextNode(" Go to shop"));
		 buyInfo.appendChild(buylink);
	 }
	 else 
	 {
		  buyInfo.appendChild(document.createTextNode(" no print available"));
	 }
	 
	 var fivehundredpixInfo = document.createElement('div');
	 fivehundredpixInfo.setAttribute('class', 'fivehundredpixOverlay');
	 
	 if (fhpID !== '')
	 {
		 var fivehundredPixlink = document.createElement('a');
		 l = 'https://500px.com/photo/' + fhpID;
		 fivehundredPixlink.setAttribute('href', l);
		 fivehundredPixlink.setAttribute('target', 'new');		  
		 fivehundredPixlink.appendChild(document.createTextNode("500px"));
		 fivehundredpixInfo.appendChild(fivehundredPixlink);
	 }
	 
	 overlay.appendChild(span);
	 overlay.appendChild(img);
	 overlay.appendChild(imgInfo); 
	 overlay.appendChild(buyInfo);
	 overlay.appendChild(fivehundredpixInfo);
	 
	 document.body.appendChild(overlay);
}


// This function closes the full size image overlay
function hideOverlay() {
	"use strict";
	document.body.removeChild(document.getElementById('overlay'));
}


// Function to show image tiles, linked to pages on individual hikes and treks
// This is equivalent to the function addGalleryTile, with some differences on the footer 
// captions
function addHikeTile(src, alt, footer_txt, date, length, href_src, id) {
	"use strict";
	var imageTile = document.createElement('div');
	imageTile.setAttribute('class', 'imageTile');
	
	var image = document.createElement('div');
	image.setAttribute('class', 'image');
	imageTile.appendChild(image);	

	var href = document.createElement('a');
	href.setAttribute('href', href_src);
	
	var img = document.createElement('img');
	img.setAttribute('src', src);
	img.setAttribute('alt', alt);	

	image.appendChild(href);
	href.appendChild(img);		
	
	var footer = document.createElement('div');
	footer.setAttribute('class', 'hikefooter');
	footer.appendChild(document.createTextNode(footer_txt));
	footer.appendChild(document.createElement('br'));
	footer.appendChild(document.createTextNode(date));	
	footer.appendChild(document.createElement('br'));
	footer.appendChild(document.createTextNode(length));		
	imageTile.appendChild(footer);
	
	document.getElementById(id).appendChild(imageTile);
}


// Function to show image tile (with link to full Image) on hike page, equivalent to addImageTile
function addHikeImage(src, title, footer_txt, id, fhpID, printid) {
	"use strict";
	if (typeof printid === 'undefined')
	{
	 	printid = '';
	}
		
	if (typeof fhpID === 'undefined')
	{	 	
		fhpID = '';
	}
	
	var imageTile = document.createElement('div');
	imageTile.setAttribute('class', 'imageTile');
	
	var image = document.createElement('div');
	image.setAttribute('class', 'image');
	imageTile.appendChild(image);
	
	var img = document.createElement('img');
	img.setAttribute('src', src);
	img.setAttribute('alt', title);
	img.setAttribute('id', title);
	img.setAttribute('title', title);

	img.setAttribute('onclick', "showFullImage('"+src+"','"+ title + "','"+footer_txt+"','" + fhpID + "','" + printid +"');");

	image.appendChild(img);
	
	var footer = document.createElement('div');
	footer.setAttribute('class', 'hoverFooter');
	footer.appendChild(document.createTextNode(title));
	imageTile.appendChild(footer);
	
	var buyFooter = document.createElement('div');
	buyFooter.setAttribute('class', 'buyFooter');
	if (printid !== ''  && shopEnabled)
	{
		 var cartimg = document.createElement('img');
		 cartimg.setAttribute('src', '/images/basket.gif');
		 cartimg.setAttribute('style', 'width:15px');		 
		 buyFooter.appendChild(cartimg);
	}
	
	buyFooter.setAttribute('onclick', "showFullImage('"+src+"','"+ title + "','"+footer_txt+"','" + fhpID + "','" + printid +"');"); 
	footer.setAttribute('onclick', "showFullImage('"+src+"','"+ title + "','"+footer_txt+"','" + fhpID + "','" + printid +"');");
	
	imageTile.appendChild(buyFooter);
	
	document.getElementById(id).appendChild(imageTile);
}