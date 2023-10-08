const formData = [{
        p_name: null,
        p_email: null,
        p_phone: null
    }, {
        plan: null,
        yearlyToggle: false
    },
    {

    }
];

const subscriptionValues = [9, 12, 15];
const servicePrice = [1, 2, 2];

const progressCss = ['text-black', 'bg-Light_blue', 'border-Light_blue'];
let currPage = 1;

const handleCard2 = (event) => {
    const clickedCard = event.target.closest('.subscription-card');
    if (!clickedCard) return;

    const subscriptionCards = cardsContainer.querySelectorAll('.subscription-card');
    subscriptionCards.forEach((card) => {
        card.classList.remove('border-Marine_blue', 'bg-Magnolia');
        card.classList.add('border-Cool_gray', 'bg-White');
    });

    clickedCard.classList.remove('border-Cool_gray', 'bg-White');
    clickedCard.classList.add('border-Marine_blue', 'bg-Magnolia');

    const planId = clickedCard.id;
    formData[1]['plan'] = planId;

}

const handleToggle = (event) => {
    const checked = event.target.checked;
    const valueParas = document.querySelectorAll('.yearly_toggle');
    const hiddenParas = document.querySelectorAll('.yearly_toggle_hidden');
    const serviceArray = document.querySelectorAll('.service_price');
    formData[1]['yearlyToggle'] = checked;

    if (checked) {
        valueParas.forEach((para, index) => para.innerText = `$${subscriptionValues[index]*10}/yr`)
        hiddenParas.forEach((para) => para.classList.remove('hidden'));
        serviceArray.forEach((para, index) => para.innerText = `+$${servicePrice[index]*10}/yr`);
    } else {
        valueParas.forEach((para, index) => para.innerText = `$${subscriptionValues[index]}/mo`)
        hiddenParas.forEach((para) => para.classList.add('hidden'));
        serviceArray.forEach((para, index) => para.innerText = `+$${servicePrice[index]}/mo`);
    }
}

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

const handleCardValues = (currPage, triggerId) => {
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
    if (currPage === 2) {
        if (triggerId === 'next_step') {
            if (!formData[1]['plan']) {
                throw new Error(`Please select a plan`);
            }
        }
    }
}

const moveForms = (event) => {
    const triggerId = event.target.id;
    try {
        if (triggerId === 'next_step') {
            handleCardValues(currPage, triggerId);
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
            handleCardValues(currPage, triggerId);
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
buttons_div.addEventListener('click', (event) => moveForms(event))

const checkBox = document.getElementById('checkBox');
checkBox.addEventListener('change', (event) => handleToggle(event))

const cardsContainer = document.getElementById('subscription_container');
cardsContainer.addEventListener('click', (event) => handleCard2(event));
changeProgress(currPage);