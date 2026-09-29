const previewImg = $(".js-preview-img");
const previewThumbs = $(".preview__thumbs");
const thumbImgs = $$(".preview__thumb");

function handleChangeImage(e) {
    const previewThumb = e.target.closest(".preview__thumb");
    if (!previewThumb) return;

    thumbImgs.forEach((img) => img.classList.remove("active"));
    previewThumb.classList.add("active");

    const src = previewThumb.getAttribute("src");
    const alt = previewThumb.getAttribute("alt");
    previewImg.setAttribute("src", src);
    previewImg.setAttribute("alt", alt);
}

previewThumbs.addEventListener("click", handleChangeImage);
