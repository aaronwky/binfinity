document.addEventListener("DOMContentLoaded", function () {
    // Initialize with the "Government" tab open
    openTab('Government');
});

function openTab(tabName) {
    var i, tabcontent, tablinks;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Deactivate all tab links
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the selected tab content
    document.getElementById(tabName).style.display = "block";

    // Activate the clicked tab link
    document.getElementById(tabName + "TabButton").classList.add("active");
}
