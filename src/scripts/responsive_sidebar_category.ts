const categoryLinks = document.querySelectorAll<HTMLElement>('.offcanvas-title');

categoryLinks.forEach((link) => {
    link.addEventListener('click', function () {
        const targetCategory = link.getAttribute('data-target');

        if (targetCategory) {
            const allContents = document.querySelectorAll<HTMLElement>('.category-content');

            allContents.forEach((content) => {
                (content as HTMLElement).style.display = 'none';
            });

            const activeContent = document.querySelector<HTMLElement>(`.category-content[data-content="${targetCategory}"]`);
            if (activeContent) {
                (activeContent as HTMLElement).style.display = 'block';
            }
        }
    });
});
