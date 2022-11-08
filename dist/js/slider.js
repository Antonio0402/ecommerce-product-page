const modal = document.querySelector('.product__modal');
const btnSlides = document.querySelectorAll('.rounded-btn');
const images = document.querySelectorAll('[role="product-images"]');
const thumbnails = document.querySelectorAll('[role="thumbnails-images"]');
const thumbImage = document.querySelectorAll('.thumbnails__image');
const closeBtn = modal.querySelector('[role="close"]');
let currIndex = 0;

function moveSlider(dir) {

  dir === 'next' ? currIndex++ : currIndex--;
  translateImage(currIndex);
  for (let thumb of thumbnails) {
    selectImage(thumb, currIndex);
  }
}

function handleBtnSlide(e) {

  e.currentTarget.getAttribute('role') === 'next' 
  ? moveSlider('next')
  : moveSlider('prev');
}

function handleThumbImage() {
  let index = 0; 
  for (let thumb of thumbnails) { 
    if([...thumb.children].indexOf(this) != -1) {
      index = [...thumb.children].indexOf(this);
      currIndex = index;
      selectImage(thumb, currIndex);
    }
  }
  translateImage(currIndex);
}

btnSlides.forEach(btnSlide => btnSlide.addEventListener('click', handleBtnSlide));
thumbImage.forEach(img => img.addEventListener('click', handleThumbImage));

images[0].querySelectorAll('.product__image').forEach(img => img.addEventListener('click', () => {
  if(window.innerWidth >= 600) {
    modal.showModal();
    modal.style.display = 'grid';
  }

}));

closeBtn.querySelector('svg').addEventListener('click', (e) => {
  console.log(e);
  modal.close();  
  modal.style.display = 'none';

});
modal.addEventListener('click', (e) => {
  if(e.currentTarget === e.target) {
    modal.close();
    modal.style.display = 'none'; 
  }
});


function translateImage(index) {
  images.forEach(image => { image.style.transform = `translateX(-${100 * index}%)`;});
  switch(index) {

    case 0: document.querySelectorAll('[role="prev"]').forEach(btn => btn.classList.add('hidden'));
    break;
    case images[0].children.length - 1: document.querySelectorAll('[role="next"]').forEach(btn => btn.classList.add('hidden'));
    break;
    default: btnSlides.forEach(btnSlide => btnSlide.classList.remove('hidden'));
    break;
  }
}

function selectImage(imageList, index) {
  imageList.querySelector('[aria-selected="true"]')
  .setAttribute('aria-selected', false);
  imageList.children[index].setAttribute('aria-selected', true);
}