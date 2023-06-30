var videos = [];
var totalPrice = 0;

function loadVideo() {
  var input = document.getElementById("video-input").value;
  var videoId = getVideoId(input);

  if (videoId) {  
    var embedUrl = "https://www.youtube.com/embed/" + videoId;
    document.getElementById("video-player").innerHTML = '<iframe src="' + embedUrl + '" frameborder="0" allowfullscreen></iframe>';
    addVideoToList(videoId);
  } else {
    alert("Invalid YouTube video URL");
  }
}

function addVideoToList(videoId) {
  var video = {
    id: videoId,
    price: 5
  };

  videos.push(video);

  var videoElement = document.createElement("div");
  videoElement.classList.add("video-item");
  videoElement.innerHTML = `
    <div class="video-thumbnail">
      <img src="https://img.youtube.com/vi/${videoId}/mqdefault.jpg" alt="Video Thumbnail">
    </div>
    <div class="video-details">
      <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="video-actions">
      <button onclick="editVideo('${videoId}')">Edit</button>
      <button onclick="deleteVideo('${videoId}')">Delete</button>
    </div>
  `;

  document.getElementById("video-list").appendChild(videoElement);
  updateCart();
}


var videos = [];
var totalPrice = 0;

function loadVideo() {
  var input = document.getElementById("video-input").value;
  var videoId = getVideoId(input);

  if (videoId) {
    var embedUrl = "https://www.youtube.com/embed/" + videoId;
    document.getElementById("video-player").innerHTML = '<iframe src="' + embedUrl + '" frameborder="0" allowfullscreen></iframe>';
    addVideoToList(videoId);
  } else {
    alert("Invalid YouTube video URL");
  }
}

function addVideoToList(videoId) {
  var video = {
    id: videoId,
    price: 5
  };

  videos.push(video);

  var videoElement = document.createElement("div");
  videoElement.classList.add("video-item");
  videoElement.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
    <div class="video-actions">
      <button onclick="editVideo('${videoId}')">Edit</button>
      <button onclick="deleteVideo('${videoId}')">Delete</button>
    </div>
  `;

  document.getElementById("video-list").appendChild(videoElement);
  updateCart();
}

function deleteVideo(videoId) {
  var index = videos.findIndex(function(video) {
    return video.id === videoId;
  });

  if (index !== -1) {
    videos.splice(index, 1);
    document.getElementById("video-list").removeChild(document.getElementById("video-list").children[index]);
    updateCart();
  }
}

function editVideo(videoId) {
  var newVideoUrl = prompt("Enter new YouTube video URL:");

  if (newVideoUrl) {
    var newVideoId = getVideoId(newVideoUrl);

    if (newVideoId) {
      var index = videos.findIndex(function(video) {
        return video.id === videoId;
      });

      if (index !== -1) {
        videos[index].id = newVideoId;
        document.getElementById("video-list").children[index].querySelector("iframe").src = "https://www.youtube.com/embed/" + newVideoId;
      }
    } else {
      alert("Invalid YouTube video URL");
    }
  }
}

function updateCart() {
  var cartElement = document.getElementById("video-cart");
  cartElement.innerHTML = "";
  totalPrice = 0;

  videos.forEach(function(video) {
    var cartItem = document.createElement("li");
    cartItem.textContent = "Video ID: " + video.id + " - Price: $" + video.price;
    cartElement.appendChild(cartItem);
    totalPrice += video.price;
  });

  document.getElementById("total-price").textContent = "$" + totalPrice;
}

function clearCart() {
  videos = [];
  document.getElementById("video-list").innerHTML = "";
  updateCart();
}


// Utility function to extract video ID from YouTube URL
function getVideoId(url) {
  var regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/|https?:\/\/(?:www\.)?youtube\.com\/embed\/)([-_a-zA-Z0-9]+)/;
  var match = url.match(regex);
  return match ? match[1] : null;
}
