const formData = [{
        p_name: null,
        p_email: null,
        p_phone: null
    }, {

    },
    {

    }
];
const progressCss = ['text-black', 'bg-Light_blue', 'border-Light_blue'];
let currPage = 1;

const changeProgress = (currPage) => {
    const progressDivs = document.getElementById('progress_bar').children;
    const progressDivArray = Array.from(progressDivs);
    if (currPage > 0 && currPage < 5) {
        if (currPage === 1) {
            const highlighted = progressDivArray[0].children.item(0);
            const nextHighlighted = progressDivArray[currPage].children.item(0);
            nextHighlighted.classList.replace(progressCss[0], 'text-White');
            nextHighlighted.classList.remove(progressCss[1]);
            nextHighlighted.classList.replace(progressCss[2], 'border-white')
            highlighted.classList.replace('text-White', progressCss[0]);
            highlighted.classList.add(progressCss[1]);
            highlighted.classList.replace('border-white', progressCss[2])
        } else if (currPage > 1 && currPage < 4) {
            const prevHighLighted = progressDivArray[currPage - 2].children.item(0);
            const nextHighlighted = progressDivArray[currPage].children.item(0);
            const highlighted = progressDivArray[currPage - 1].children.item(0);
            prevHighLighted.classList.replace(progressCss[0], 'text-White');
            prevHighLighted.classList.remove(progressCss[1]);
            prevHighLighted.classList.replace(progressCss[2], 'border-white')
            nextHighlighted.classList.replace(progressCss[0], 'text-White');
            nextHighlighted.classList.remove(progressCss[1]);
            nextHighlighted.classList.replace(progressCss[2], 'border-white')
            highlighted.classList.replace('text-White', progressCss[0]);
            highlighted.classList.add(progressCss[1]);
            highlighted.classList.replace('border-white', progressCss[2]);

        } else {
            const prevHighLighted = progressDivArray[currPage - 2].children.item(0);
            const highlighted = progressDivArray[currPage - 1].children.item(0);
            prevHighLighted.classList.replace(progressCss[0], 'text-White');
            prevHighLighted.classList.remove(progressCss[1]);
            prevHighLighted.classList.replace(progressCss[2], 'border-white')
            highlighted.classList.replace('text-White', progressCss[0]);
            highlighted.classList.add(progressCss[1]);
            highlighted.classList.replace('border-white', progressCss[2]);
        }
    }
}

const formCheck = (p_name, p_email, p_phone) => {
    if (p_name === '') {
        throw new Error('Please enter your name');
    }
    if (p_email === '') {
        throw new Error('Please enter your email');
    } else {
        let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        let result = regex.test(p_email);
        if (!result) {
            throw new Error('Please enter a valid email')
        }
    }
    if (p_phone === '') {
        throw new Error('Please enter your phone number')
    } else if (p_phone.length < 11) {
        throw new Error('Please enter a valid phone number')
    }
}

const handleCards = (currPage, triggerId) => {
    if (currPage === 1) {
        if (triggerId === 'next_step') {
            const p_name = document.getElementById('p_name').value;
            const p_email = document.getElementById('p_email').value;
            const p_phone = document.getElementById('p_phone').value;
            formCheck(p_name, p_email, p_phone)
            formData[0] = { p_name, p_email, p_phone };
            console.log(formData[0]);
        } else {
            document.getElementById('p_name').value = formData[0]['p_name'];
            document.getElementById('p_email').value = formData[0]['p_email'];
            document.getElementById('p_phone').value = formData[0]['p_phone'];
        }

    }
}

const moveForms = (event) => {
    const triggerId = event.target.id;
    try {
        if (triggerId === 'next_step') {
            handleCards(currPage, triggerId);
            currPage += 1;
            changeProgress(currPage);
            if (currPage <= 5) {
                const currCard = document.getElementById(`card${currPage-1}`);
                const nextCard = document.getElementById(`card${currPage}`);
                currCard.classList.add('hidden');
                currCard.classList.remove('flex');
                nextCard.classList.add('flex');
                nextCard.classList.remove('hidden')
                document.getElementById('prev_step').classList.remove('hidden')
            }
            if (currPage === 5) {
                // document.querySelector('.button_class').classList.remove('flex')
                document.querySelector('.button_class').style.display = 'none'
            }
        }
        if (triggerId === 'prev_step') {
            currPage -= 1;
            changeProgress(currPage);
            handleCards(currPage, triggerId);
            if (currPage > 0) {
                const currCard = document.getElementById(`card${currPage+1}`);
                const prevCard = document.getElementById(`card${currPage}`);
                currCard.classList.add('hidden');
                currCard.classList.remove('flex');
                prevCard.classList.add('flex');
                prevCard.classList.remove('hidden')
            }
            if (currPage === 1) {
                document.getElementById('prev_step').classList.add('hidden')
            }
        }
    } catch (error) {
        alert(error);
    }
}
const buttons_div = document.querySelector('.button_class');
buttons_div.addEventListener('click', (event) => {
    moveForms(event);
})

changeProgress(currPage)