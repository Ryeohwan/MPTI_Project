class OpenviduLayout {
    constructor(){
        this.layoutContainer = undefined;
        this.opts = undefined;
    }
    initLayoutContainer(container, opts) {
        this.opts = {
            maxRatio: opts.maxRatio != null ? opts.maxRatio : 3 / 2,
            minRatio: opts.minRatio != null ? opts.minRatio : 9 / 16,
            fixedRatio: opts.fixedRatio != null ? opts.fixedRatio : false,
            animate: opts.animate != null ? opts.animate : false,
            bigClass: opts.bigClass != null ? opts.bigClass : 'OT_big',
            bigPercentage: opts.bigPercentage != null ? opts.bigPercentage : 0.8,
            bigFixedRatio: opts.bigFixedRatio != null ? opts.bigFixedRatio : false,
            bigMaxRatio: opts.bigMaxRatio != null ? opts.bigMaxRatio : 3 / 2,
            bigMinRatio: opts.bigMinRatio != null ? opts.bigMinRatio : 9 / 16,
            bigFirst: opts.bigFirst != null ? opts.bigFirst : true
          };
          this.layoutContainer = typeof container === 'string' ? document.querySelector(container) : container;      
    }
    setLayoutOptions(options) {
        this.opts = options
    }

    updateLayout() {
        if (this.layoutContainer.style.display === 'none') {
            return;
          }
    
          var id = this.layoutContainer.id;
    
          if (!id) {
            id = 'OT_' + this.cheapUUID();
            this.layoutContainer.id = id;
          }
          var HEIGHT = this.getHeight(this.layoutContainer) - this.getCSSNumber(this.layoutContainer, 'borderTop') - this.getCSSNumber(this.layoutContainer, 'borderBottom');
          var WIDTH = this.getWidth(this.layoutContainer) - this.getCSSNumber(this.layoutContainer, 'borderLeft') - this.getCSSNumber(this.layoutContainer, 'borderRight');
          var availableRatio = HEIGHT / WIDTH;
          var offsetLeft = 0;
          var offsetTop = 0;
          var bigOffsetTop = 0;
          var bigOffsetLeft = 0;
          var bigOnes = Array.prototype.filter.call(this.layoutContainer.querySelectorAll('#' + id + '>.' + this.opts.bigClass), this.filterDisplayNone);
          var smallOnes = Array.prototype.filter.call(this.layoutContainer.querySelectorAll('#' + id + '>*:not(.' + this.opts.bigClass + ')'), this.filterDisplayNone);
          if (bigOnes.length > 0 && smallOnes.length > 0) {
            var bigWidth, bigHeight;
    
            if (availableRatio > this.getVideoRatio(bigOnes[0])) {
              // We are tall, going to take up the whole width and arrange small
              // guys at the bottom
              bigWidth = WIDTH;
              bigHeight = Math.floor(HEIGHT * this.opts.bigPercentage);
              offsetTop = bigHeight;
              bigOffsetTop = HEIGHT - offsetTop;
            } else {
              // We are wide, going to take up the whole height and arrange the small
              // guys on the right
              bigHeight = HEIGHT;
              bigWidth = Math.floor(WIDTH * this.opts.bigPercentage);
              offsetLeft = bigWidth;
              bigOffsetLeft = WIDTH - offsetLeft;
            }
            
            if (this.opts.bigFirst) {
              this.arrange(bigOnes, bigWidth, bigHeight, 0, 0, this.opts.bigFixedRatio, this.opts.bigMinRatio, this.opts.bigMaxRatio, this.opts.animate);
              this.arrange(smallOnes, WIDTH - offsetLeft, HEIGHT - offsetTop, offsetLeft, offsetTop, this.opts.fixedRatio, this.opts.minRatio, this.opts.maxRatio, this.opts.animate);
            } else {
              this.arrange(smallOnes, WIDTH - offsetLeft, HEIGHT - offsetTop, 0, 0, this.opts.fixedRatio, this.opts.minRatio, this.opts.maxRatio, this.opts.animate);
              this.arrange(bigOnes, bigWidth, bigHeight, bigOffsetLeft, bigOffsetTop, this.opts.bigFixedRatio, this.opts.bigMinRatio, this.opts.bigMaxRatio, this.opts.animate);
            }
          } else if (bigOnes.length > 0 && smallOnes.length === 0) {
            
            this // We only have one bigOne just center it
            .arrange(bigOnes, WIDTH, HEIGHT, 0, 0, this.opts.bigFixedRatio, this.opts.bigMinRatio, this.opts.bigMaxRatio, this.opts.animate);
          } else {
            this.arrange(smallOnes, WIDTH - offsetLeft, HEIGHT - offsetTop, offsetLeft, offsetTop, this.opts.fixedRatio, this.opts.minRatio, this.opts.maxRatio, this.opts.animate);
        }
          
    }

    getHeight(elem) {
        let heightStr = window.getComputedStyle(elem).height;
        return heightStr ? parseInt(heightStr, 10) : 0;
    }

    getWidth(elem) {
        let widthStr = window.getComputedStyle(elem).width;
        return widthStr ? parseInt(widthStr, 10) : 0;
    }

    getCSSNumber(elem, prop) {
        let cssStr = window.getComputedStyle(elem).getPropertyValue(prop);
        return cssStr ? parseInt(cssStr, 10) : 0;
    }

    getcheapUUID() {
        return (Math.random() * 100000000).toFixed(0);
    }

    getBestDimensions(minR, maxR, count, WIDTH, HEIGHT, targetHeight) {
        var maxArea, targetCols, targetRows, targetWidth, tWidth, tHeight, tRatio; // Iterate through every possible combination of rows and columns
        // and see which one has the least amount of whitespace
  
        for (var i = 1; i <= count; i++) {
          var colsAux = i;
          var rowsAux = Math.ceil(count / colsAux); // Try taking up the whole height and width
  
          tHeight = Math.floor(HEIGHT / rowsAux);
          tWidth = Math.floor(WIDTH / colsAux);
          tRatio = tHeight / tWidth;
  
          if (tRatio > maxR) {
            // We went over decrease the height
            tRatio = maxR;
            tHeight = tWidth * tRatio;
          } else if (tRatio < minR) {
            // We went under decrease the width
            tRatio = minR;
            tWidth = tHeight / tRatio;
          }
  
          var area = tWidth * tHeight * count; // If this width and height takes up the most space then we're going with that
  
          if (maxArea === undefined || area > maxArea) {
            maxArea = area;
            targetHeight = tHeight;
            targetWidth = tWidth;
            targetCols = colsAux;
            targetRows = rowsAux;
          }
        }
  
        return {
          maxArea: maxArea,
          targetCols: targetCols,
          targetRows: targetRows,
          targetHeight: targetHeight,
          targetWidth: targetWidth,
          ratio: targetHeight / targetWidth
        };
    }

    filterDisplayNone(element) {
        return element.style.display !== 'none';
    }

    arrange(children, WIDTH, HEIGHT, offsetLeft, offsetTop, fixedRatio, minRatio, maxRatio, animate){
        var targetHeight;
        var count = children.length;
        var dimensions;
  
        if (!fixedRatio) {
          dimensions = this.getBestDimensions(minRatio, maxRatio, count, WIDTH, HEIGHT, targetHeight);
        } else {
          // Use the ratio of the first video element we find to approximate
          var ratio = this.getVideoRatio(children.length > 0 ? children[0] : null);
          dimensions = this.getBestDimensions(ratio, ratio, count, WIDTH, HEIGHT, targetHeight);
        } // Loop through each stream in the container and place it inside
  
  
        var x = 0,
            y = 0;
        var rows = [];
        var row; // Iterate through the children and create an array with a new item for each row
        // and calculate the width of each row so that we know if we go over the size and need
        // to adjust
  
        for (var i = 0; i < children.length; i++) {
          if (i % dimensions.targetCols === 0) {
            // This is a new row
            row = {
              children: [],
              width: 0,
              height: 0
            };
            rows.push(row);
          }
  
          var elem = children[i];
          row.children.push(elem);
          var targetWidth = dimensions.targetWidth;
          targetHeight = dimensions.targetHeight; // If we're using a fixedRatio then we need to set the correct ratio for this element
  
          if (fixedRatio) {
            targetWidth = targetHeight / this.getVideoRatio(elem);
          }
  
          row.width += targetWidth;
          row.height = targetHeight;
        } // Calculate total row height adjusting if we go too wide
  
  
        var totalRowHeight = 0;
        var remainingShortRows = 0;
  
        for (var _i = 0; _i < rows.length; _i++) {
          row = rows[_i];
  
          if (row.width > WIDTH) {
            // Went over on the width, need to adjust the height proportionally
            row.height = Math.floor(row.height * (WIDTH / row.width));
            row.width = WIDTH;
          } else if (row.width < WIDTH) {
            remainingShortRows += 1;
          }
  
          totalRowHeight += row.height;
        }
  
        if (totalRowHeight < HEIGHT && remainingShortRows > 0) {
          // We can grow some of the rows, we're not taking up the whole height
          var remainingHeightDiff = HEIGHT - totalRowHeight;
          totalRowHeight = 0;
  
          for (var _i2 = 0; _i2 < rows.length; _i2++) {
            row = rows[_i2];
  
            if (row.width < WIDTH) {
              // Evenly distribute the extra height between the short rows
              var extraHeight = remainingHeightDiff / remainingShortRows;
  
              if (extraHeight / row.height > (WIDTH - row.width) / row.width) {
                // We can't go that big or we'll go too wide
                extraHeight = Math.floor((WIDTH - row.width) / row.width * row.height);
              }
  
              row.width += Math.floor(extraHeight / row.height * row.width);
              row.height += extraHeight;
              remainingHeightDiff -= extraHeight;
              remainingShortRows -= 1;
            }
  
            totalRowHeight += row.height;
          }
        } // vertical centering
  
  
        y = (HEIGHT - totalRowHeight) / 2; // Iterate through each row and place each child
  
        for (var _i3 = 0; _i3 < rows.length; _i3++) {
          row = rows[_i3]; // center the row
  
          var rowMarginLeft = (WIDTH - row.width) / 2;
          x = rowMarginLeft;
  
          for (var j = 0; j < row.children.length; j++) {
            var _elem = row.children[j];
            var _targetWidth = dimensions.targetWidth;
            targetHeight = row.height; // If we're using a fixedRatio then we need to set the correct ratio for this element
  
            if (fixedRatio) {
              _targetWidth = Math.floor(targetHeight / this.getVideoRatio(_elem));
            }
  
            _elem.style.position = 'absolute'; // $(elem).css('position', 'absolute');
  
            var actualWidth = _targetWidth - this.getCSSNumber(_elem, 'paddingLeft') - this.getCSSNumber(_elem, 'paddingRight') - this.getCSSNumber(_elem, 'marginLeft') - this.getCSSNumber(_elem, 'marginRight') - this.getCSSNumber(_elem, 'borderLeft') - this.getCSSNumber(_elem, 'borderRight');
            var actualHeight = targetHeight - this.getCSSNumber(_elem, 'paddingTop') - this.getCSSNumber(_elem, 'paddingBottom') - this.getCSSNumber(_elem, 'marginTop') - this.getCSSNumber(_elem, 'marginBottom') - this.getCSSNumber(_elem, 'borderTop') - this.getCSSNumber(_elem, 'borderBottom');
            this.positionElement(_elem, x + offsetLeft, y + offsetTop, actualWidth, actualHeight, animate);
            x += _targetWidth;
          }
  
          y += targetHeight;
        }
    }

    getVideoRatio(elem) {
            if (!elem) {
              return 3 / 4;
            }
      
            var video = elem.querySelector('video');
      
            if (video && video.videoHeight && video.videoWidth) {
              return video.videoHeight / video.videoWidth;
            } else if (elem.videoHeight && elem.videoWidth) {
              return elem.videoHeight / elem.videoWidth;
            }
      
            return 3 / 4;
    }
    positionElement(elem, x, y, width, height, animate) {
        var targetPosition = {
          left: x + 'px',
          top: y + 'px',
          width: width + 'px',
          height: height + 'px'
        };
        this.fixAspectRatio(elem, width);
        if (animate) {
            elem.style.transition = `all ${animate.duration || 200}ms ${animate.easing || 'swing'}`;
            Object.assign(elem.style, targetPosition);
            this.fixAspectRatio(elem, width);
          
            if (animate.complete) {
              setTimeout(() => animate.complete.call(this), animate.duration || 200);
            }
          } else {
            Object.assign(elem.style, targetPosition);
          }
  
        this.fixAspectRatio(elem, width);
    }
    fixAspectRatio(elem, width) {
        var sub = elem.querySelector('.OT_root');

        if (sub) {
          // If this is the parent of a subscriber or publisher then we need
          // to force the mutation observer on the publisher or subscriber to
          // trigger to get it to fix it's layout
          var oldWidth = sub.style.width;
          sub.style.width = width + 'px'; // sub.style.height = height + 'px';
  
          sub.style.width = oldWidth || '';
        }
    }
}


export default OpenviduLayout