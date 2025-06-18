export function CategorySide() {

    const categoryLinks = document.querySelectorAll<HTMLElement>('.dropdown-item');

    categoryLinks.forEach((link) => {
        link.addEventListener('mouseover', function () {

            const targetCategory = link.getAttribute('data-target');

            if (targetCategory) {
                const allContents = document.querySelectorAll<HTMLElement>('.category-content');
                allContents.forEach((content) => {
                    content.classList.remove('active');
                });

                const categoryContent = document.getElementById(`category-content-${targetCategory}`);
                if (categoryContent) {
                    categoryContent.classList.add('active');
                }
            }
        });
    });
}