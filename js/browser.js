(function () {
  var uaList = [
    'iPhone',         // Apple iPhone
    'iPod',           // Apple iPod touch
    'iPad',						//Apple iPad
    'Android',        // 1.5+ Android
    'dream',          // Pre 1.5 Android
    'CUPCAKE',        // 1.5+ Android
    'blackberry9500', // Storm
    'blackberry9530', // Storm
    'blackberry9520', // Storm v2
    'blackberry9550', // Storm v2
    'blackberry9800', // Torch
    'webOS',          // Palm Pre Experimental
    'incognito',      // Other iPhone browser
    'webmate'         // Other iPhone browser
  ]
  var UA = navigator.userAgent.toLowerCase()
  var isSP = false

  for (var i = 0, len = uaList.length; i < len; i ++) {
    if ( UA.indexOf(uaList[i].toLowerCase()) > -1 ) {
      isSP = true
      break;
    }
  }

  if (isSP) {
    document.querySelector('.for-pc').style.display = 'none'
    var milkcocoa = new MilkCocoa('iceiul7ul3d.mlkcca.com');
    var ds = milkcocoa.dataStore('remote-tetris');
    var ID = location.hash
    ds.send({ID: ID, type: 'onController'});
  } else {
    document.querySelector('.for-sp').style.display = 'none'
  }
})()
