
(function () {

    var wrapper = document.getElementById('wrapper');
    var loadMoreButton = document.createElement('button');
    loadMoreButton.innerHTML = 'Load More';
    loadMoreButton.classList.add('button');
    wrapper.appendChild(loadMoreButton);

    var request = new XMLHttpRequest();
    var url = "./items.json";
    request.open("GET", url, false);
    request.send();

    var myArr = JSON.parse(request.responseText);
    loadMoreButton.addEventListener('click', function () {
        loadMore(myArr);
    });


    var enableInfiniteScrolling = document.createElement('button');
    enableInfiniteScrolling.innerHTML = 'Enable infinite scrolling';
    enableInfiniteScrolling.classList.add('button');
    wrapper.appendChild(enableInfiniteScrolling);

    var disableInfiniteScrolling = document.createElement('button');
    disableInfiniteScrolling.innerHTML = 'Disable infinite scrolling';
    disableInfiniteScrolling.classList.add('button');
    disableInfiniteScrolling.classList.add('hide');
    wrapper.appendChild(disableInfiniteScrolling);



    enableInfiniteScrolling.addEventListener('click', function () {
        loadMoreButton.classList.add('hide');
        enableInfiniteScrolling.classList.add('hide');
        disableInfiniteScrolling.classList.remove('hide');
        document.addEventListener('wheel', wheelHandler);
    });

    disableInfiniteScrolling.addEventListener('click', function () {
        loadMoreButton.classList.remove('hide');
        disableInfiniteScrolling.classList.add('hide');
        enableInfiniteScrolling.classList.remove('hide');
        document.removeEventListener('wheel', wheelHandler);
    });

    function wheelHandler() {
        if(event.deltaY > 0 && (window.innerHeight + window.scrollY) >= document.body.offsetHeight){
            loadMore(myArr);
        }
    }
    function loadMore(myArr) {
        var wrapperBlocks = document.createElement('div');
        wrapperBlocks.classList.add('wrapper-blocks');
        wrapper.insertBefore(wrapperBlocks, loadMoreButton);

        myArr.forEach(function (item, i) {
            var block = document.createElement('div');
            block.classList.add('block');
            block.classList.add('block' + (i+1));
            var img = document.createElement('img');
            var  imgSrc = '.' + item.image;
            img.setAttribute('src', imgSrc);
            img.classList.add('image');
            var stars = document.createElement('img');
            stars.setAttribute('src', 'imgs/stars.png');
            stars.classList.add('stars');
            var title = document.createElement('span');
            title.innerHTML = item.title;
            var paragraph = document.createElement('p');
            paragraph.innerHTML = item.paragraph;
            wrapperBlocks.appendChild(block);
            block.appendChild(img);
            block.appendChild(stars);
            block.appendChild(title);
            block.appendChild(paragraph);
        });

    }

})();
