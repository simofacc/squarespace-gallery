$(document).ready(function(){
     LoadImages();
 });
 
 var LoadImages = function(){
     var settings = {
         error: function(jqxhr, status, error){
             console.log('Error Loading Gallery Data: ');
             console.log(jqxhr);
             console.log(status);
             console.log(error);
         },
         success:function(data){ LoadImagesCallback(data);},
         url: window.location.href + "?format=json-pretty"
     }
     $.ajax(settings);
 }
 
 var LoadImagesCallback = function(data) {
   if(!data){
     return;
   }

   var $grid = $('<div class="sf-grid" style="display:flex;flex-wrap:wrap;"></div>');
   
   if(data.items && data.items.length > 0){
   	var galleryImages = data.items.filter( function(item) {
    	return item.recordTypeLabel === 'image';
    });

    var sizeRegex = /\d+x\d+/;

    galleryImages.map( function(image, i){
        var imageId = image.id || null;
        var focalPoint = image.mediaFocalPoint || null;
        var tags = image.tags;

        var imageUrl = image.assetUrl;

        var size = tags ? tags.find(function(tag){
            return tag.match(sizeRegex);
        }) : '';

        var $image = $('<img src="'+imageUrl+'750w"/>');

        if(focalPoint !== null){
            var imageX = focalPoint.x * 100;
            var imageY = focalPoint.y * 100;
            $image.css('object-position', imageX + '% '+ imageY +'%' );
        }
        

        var $link = $('<a href="'+imageUrl+'" class="sf-image sf-image-gallery"></a>').append($image);
        var $col = $('<div class="sf-col"></div>');
        
        if(i!==0){

            if(i%3 === 0){
                $grid.append($col.clone());
                $link.addClass('shrink');
            }

            if(i%2 === 0){
                $link.addClass('taller');
            }
        }else{
            $link.addClass('shrink');
        }

        $col.append($link);

        $grid.append($col);
    });

    $('.sqs-system-gallery').after($grid);    
    $('.sqs-system-gallery').remove();
    
    new LuminousGallery(document.querySelectorAll(".sf-image-gallery"));
   }
   
 }
