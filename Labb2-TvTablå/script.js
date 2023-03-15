
const loader = document.getElementById("js-loading");
const container = document.querySelector("#js-schedule");

const displayLoading = () => {
    container.classList.add("hidden");
    loader.classList.remove("hidden");
};

const hideLoading = () => {
    container.classList.remove("hidden");
    loader.classList.add("hidden");
};

function toggleMenu() {
    let icon = document.querySelector(".menu-icon i");
    let menu = document.querySelector(".menu");
    icon.classList.toggle("fa-times");
    if (menu.className == "menu") {
        menu.classList.add("menu--show");
        menu.style.transition = "1s";
    } else {
        menu.classList.remove("menu--show");
    }

};


const setChannel = (channel) => {
    title = document.getElementById("js-title");

    if (channel == "SVT 1") {
        title.innerHTML = "SVT 1";
        fetchSVT1();
    } else if (channel == "SVT 2") {
        title.innerHTML = "SVT 2";
        fetchSVT2();
    } else if (channel == "SVT Barn") {
        title.innerHTML = "SVT Barn";
        fetchSvtBarn();

    } else if (channel == "Kunskapskanalen") {
        title.innerHTML = "Kunskapskanalen";
        fetchKunskapskanalen();
    } else if (channel == "SVT 24") {
        title.innerHTML = "SVT 24";
        fetchSvt24();
    }
};


function fetchSVT1() {
    displayLoading();
    fetch('data/SVT 1.json')
        .then(response => response.json())
        .then(data => {
            hideLoading();
            renderData(data);
        })
        .catch(error => console.log(error));
};

function fetchSVT2() {
    displayLoading();
    fetch('data/SVT 2.json')
        .then(response => response.json())
        .then(data => {
            hideLoading();
            renderData(data);
        })
        .catch(error => console.log(error));
};

function fetchSvtBarn() {
    displayLoading();
    fetch('data/SVT Barn.json')
        .then(response => response.json())
        .then(data => {
            hideLoading();
            renderData(data);

        })
        .catch(error => console.log(error));
};

function fetchKunskapskanalen() {
    displayLoading();
    fetch('data/kunskapskanalen.json')
        .then(response => response.json())
        .then(data => {
            hideLoading();
            renderData(data);
        })
        .catch(error => console.log(error));


};



function fetchSvt24() {
    displayLoading();
    fetch('data/SVT 24.json')
        .then(response => response.json())
        .then(data => {
            hideLoading();
            renderData(data);
        })
        .catch(error => console.log(error));
};



function renderData(data) {

    data.sort(compareStartTime);
    
    let htmlToRender = '<ul class="list-group list-group-flush">';
    let li = '<li class="list-group-item show-previous" onclick="showPrevious()">Visa Tidigare Program</li>';


    htmlToRender += li;
    let filteredData = filterPrograms(data);

    for (obj of filteredData) {
        htmlToRender += '<li class="list-group-item">' +
            "<strong>" +
            timeFormatter(obj.start) +
            "</strong>" +
            '<div id="myDiv" >' +
            obj.name +
            "</div>" +
            "</li>";
    }

    htmlToRender += "</ul>";
    document.querySelector("#js-schedule").innerHTML = htmlToRender;

    

    showPrevious = () => {

        let htmlToRender = '<ul class="list-group list-group-flush">';

        for (program of data) {

            htmlToRender += '<li class="list-group-item">' +
                "<strong>" +
                timeFormatter(program.start) +
                "</strong>" +
                '<div id="myDiv">' +
                program.name +
                "</div>" +
                "</li>";
            htmlToRender += "</ul>";

            document.querySelector("#js-schedule").innerHTML = htmlToRender;
        }
    }

};


function filterPrograms(data) {

    let currentTime = new Date();
    let filteredData = data.filter(function (obj) {
        pTime = new Date(obj.start);
        return pTime.toLocaleTimeString() > currentTime.toLocaleTimeString();
    })
    return filteredData;
};

const compareStartTime = (obj1, obj2) => {
    if (obj1.start > obj2.start) {
        return 1;
    }
    if (obj1.start < obj2.start) {
        return -1;
    }

    return 0;
};

function timeFormatter(time) {
    return new Date(time).toLocaleTimeString();
};




