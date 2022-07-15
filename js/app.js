//array to hold photo info 
const photos = [
    {
        name: `01`,
        title: `Hay Bales`,
        caption: `I love hay bales. Took this snap on a drive through the countryside past some straw fields.`,
    },
    {
        name: `02`,
        title: `Lake`,
        caption: `The lake was so calm today. We had a great view of the snow on the mountains from here.`,
    },
    {
        name: `03`,
        title: `Canyon`,
        caption: `I hiked to the top of the mountain and got this picture of the canyon and trees below.`,
    },
    {
        name: `04`,
        title: `Iceberg`,
        caption: `It was amazing to see an iceberg up close, it was so cold but didn’t snow today.`,
    },
    {
        name: `05`,
        title: `Desert`,
        caption: `The red cliffs were beautiful. It was really hot in the desert but we did a lot of walking through the canyons.`,
    },
    {
        name: `06`,
        title: `Fall`,
        caption: `Fall is coming, I love when the leaves on the trees start to change color.`,
    },
    {
        name: `07`,
        title: `Plantation`,
        caption: `I drove past this plantation yesterday, everything is so green!`,
    },
    {
        name: `08`,
        title: `Dunes`,
        caption: `My summer vacation to the Oregon Coast. I love the sandy dunes!`,
    },
    {
        name: `09`,
        title: `Countryside Lane`,
        caption: `We enjoyed a quiet stroll down this countryside lane.`,
    },
    {
        name: `10`,
        title: `Sunset`,
        caption: `Sunset at the coast! The sky turned a lovely shade of orange.`,
    },
    {
        name: `11`,
        title: `Cave`,
        caption: `I did a tour of a cave today and the view of the landscape below was breathtaking.`,
    },
    {
        name: `12`,
        title: `Bluebells`,
        caption: `I walked through this meadow of bluebells and got a good view of the snow on the mountain before the fog came in.`,
    },
];

//dynamically adds photos from array into HTML
function createPhotoHTML(photo) {
    return `
        <a class="photos" id="${photo.name}" href="img/${photo.name}.jpg" title="${photo.title}" data-caption="${photo.caption}">
            <img src="img/thumbnails/${photo.name}.jpg" alt="Photo of ${photo.title}">
        </a>
    `;
}

document.querySelector('.gallery').innerHTML = photos.map(photo => createPhotoHTML(photo)).join('');

//lightbox plugin
window.addEventListener('load', function() {
  baguetteBox.run('.gallery',{
    buttons: true
  });
});

//Search functionality
document.getElementById("searchbar").addEventListener("keyup", searchPhotos);

function searchPhotos() {
    const input = document.getElementById("searchbar").value.toLowerCase();
    let pics = document.querySelectorAll(".photos");
    for (let i = 0; i < pics.length; i++) {
        let pic = pics[i];
        let caption = pic.getAttribute("data-caption").toLowerCase();
        if (caption.indexOf(input) > -1) {
            pics[i].style.display="";
        } else {
            pics[i].style.display="none";
        }
    }
}
