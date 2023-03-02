

function displayVideos(data){
    const videoDiv = document.getElementById('videos');
    videoDiv.innerHTML =" ";
    data.items.forEach(item => {
        const thumbnails = item.snippet.thumbnails.medium.url;
        const title = item.snippet.title;
        const description = item.snippet.description;
        const author = item.snippet.channelTitle;
        const publishedAt = item.snippet.publishTime;
        console.log(item);
        
        
        let br = document.createElement("br");

        const videoContainer = document.createElement("div");
        const videoElement = document.createElement("img");
        videoElement.setAttribute('class','video-img');
        videoContainer.setAttribute('class','video-style');
    
        const videoDescription = document.createElement("div");
        let des = document.createElement("h4");
        let descriptionInner = document.createElement("p");
        let authorElement = document.createElement("h4");
        let publishedElement = document.createElement("p");
        authorElement.innerHTML = author;
        publishedElement.innerHTML = `<strong>Published At </strong>${publishedAt}`;
        descriptionInner.innerHTML = `${description}`;

        des.append(title);
        des.append(br);
        const anchorTag = document.createElement("a");
        anchorTag.setAttribute("href",`https://www.youtube.com/watch?v=${item.id.videoId}`);
        anchorTag.append(des);

        const http = new XMLHttpRequest();
        http.open("GET", "https://www.googleapis.com/youtube/v3/videos?key=" + api_key + "&id=" + item.id.videoId + "&part=snippet,statistics");
        
        var viewCount = 0;
        http.onload = function () {
            const data = JSON.parse(http.responseText);
            console.log(data.items);
            viewCount = data["items"][0].statistics.viewCount;
            console.log("views count is ", viewCount);
            videoContainer.append(videoElement);
            videoContainer.append(videoDescription);
            videoElement.setAttribute("src",`${thumbnails}`);
       
            videoDescription.append(anchorTag);
            videoDescription.append(descriptionInner);
            videoDescription.append(authorElement);
            videoDescription.append(publishedElement);
            const views = document.createElement("p");
            views.innerHTML = `<strong>Views :</strong> ${viewCount}`;
            videoDescription.append(views);
        }
        http.send();
        videoDiv.append(videoContainer);
    });
    var paginList = document.getElementById("pagination");
    apply_pagination(paginList,data);
}
