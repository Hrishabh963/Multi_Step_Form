const formData = [{
    p_name: null,
    p_email: null,
    p_phone: null
}, {
    index: null,
    plan: null,
    yearlyToggle: false
}, ];

const subscriptionValues = [9, 12, 15];

const services = ['Online service', 'Larger storage', 'Customizable profile']
const servicePrice = [1, 2, 2];
const serviceChecked = [false, false, false];

let currPage = 1;

const handleCard4 = () => {
    let total = 0;
    const serviceSelected = document.getElementById('service_selected');
    const servicePriceSelected = document.getElementById('service_price_selected');
    const servicesAdded = document.getElementById('services_added');
    servicesAdded.innerHTML = '';
    const tenure = formData[1]['yearlyToggle'] ? 'Yearly' : 'Monthly';
    serviceSelected.innerText = `${formData[1]['plan']}(${tenure})`;
    const serviceSelectedPrice = formData[1]['yearlyToggle'] ? subscriptionValues[formData[1]['index']] * 10 : subscriptionValues[formData[1]['index']];
    const tenureString = formData[1]['yearlyToggle'] ? 'yr' : 'mo';
    servicePriceSelected.innerText = `$${serviceSelectedPrice}`;
    total += serviceSelectedPrice;
    serviceChecked.forEach((isChecked, index) => {
        if (isChecked) {
            const price = formData[1]['yearlyToggle'] ? servicePrice[index] * 10 : servicePrice[index];
            const priceString = `$${price}/${tenureString}`
            const div = document.createElement('div');
            div.classList.add(...['flex', 'h-1/3', 'w-[99%]', 'justify-between'])
            const innerDivs = `<div class="flex flex-col basis[10%]">
                <p>${services[index]}</p>
            </div>
            <div class="flex flex-wrap basis[30%]">
                <p>${priceString}</p>
            </div>`
            div.innerHTML = innerDivs;
            servicesAdded.appendChild(div);
            total += price;
        }
    })
    const totalPrice = document.getElementById('total_price');
    totalPrice.innerText = `+${total}/${tenureString}`
}

const handleServices = (event) => {
    if (event.target.type === 'checkbox') {
        const serviceCheckboxes = document.querySelectorAll('.service_checkbox');
        serviceCheckboxes.forEach((checkbox, index) => {
            const parent = checkbox.parentElement.parentElement;
            if (checkbox.checked) {
                parent.classList.replace('border-Light_gray', 'border-Purplish_blue');
                parent.classList.add('bg-Magnolia');
                serviceChecked[index] = true;
            } else {
                parent.classList.replace('border-Purplish_blue', 'border-Light_gray');
                parent.classList.remove('bg-Magnolia');
                serviceChecked[index] = false;
            }
        });
    }
}

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

    const index = Number(clickedCard.dataset.index);
    const planId = clickedCard.id;
    formData[1]['plan'] = planId;
    formData[1]['index'] = index;

}

const handleToggle = (event) => {
    const checked = event.target.checked;
    const valueParas = document.querySelectorAll('.yearly_toggle');
    const hiddenParas = document.querySelectorAll('.yearly_toggle_hidden');
    const serviceArray = document.querySelectorAll('.service_price');
    const monthlyP = document.getElementById('monthly_p');
    const yearlyP = document.getElementById('yearly_p');
    formData[1]['yearlyToggle'] = checked;
    if (checked) {
        valueParas.forEach((para, index) => para.innerText = `$${subscriptionValues[index]*10}/yr`)
        hiddenParas.forEach((para) => para.classList.remove('hidden'));
        serviceArray.forEach((para, index) => para.innerText = `+$${servicePrice[index]*10}/yr`);
        monthlyP.classList.replace('text-Marine_blue', 'text-Cool_gray');
        yearlyP.classList.replace('text-Cool_gray', 'text-Marine_blue');

    } else {
        valueParas.forEach((para, index) => para.innerText = `$${subscriptionValues[index]}/mo`)
        hiddenParas.forEach((para) => para.classList.add('hidden'));
        serviceArray.forEach((para, index) => para.innerText = `+$${servicePrice[index]}/mo`);
        yearlyP.classList.replace('text-Marine_blue', 'text-Cool_gray');
        monthlyP.classList.replace('text-Cool_gray', 'text-Marine_blue');
    }
}

const changeProgress = (currPage) => {
    const progressCss = ['text-black', 'bg-Light_blue', 'border-Light_blue'];
    const progressDivs = document.getElementById('progress_bar').children;
    const progressDivArray = Array.from(progressDivs);
    if (currPage > 0 && currPage < 5) {
        if (currPage === 1) {
            const highlighted = progressDivArray[0].children.item(0);
            const nextHighlighted = progressDivArray[currPage].children.item(0);
            nextHighlighted.classList.replace(progressCss[0], 'text-White');
            nextHighlighted.classList.remove(progressCss[1]);
            nextHighlighted.classList.replace(progressCss[2], 'border-White')
            highlighted.classList.replace('text-White', progressCss[0]);
            highlighted.classList.add(progressCss[1]);
            highlighted.classList.replace('border-White', progressCss[2])
        } else if (currPage > 1 && currPage < 4) {
            const prevHighLighted = progressDivArray[currPage - 2].children.item(0);
            const nextHighlighted = progressDivArray[currPage].children.item(0);
            const highlighted = progressDivArray[currPage - 1].children.item(0);
            prevHighLighted.classList.replace(progressCss[0], 'text-White');
            prevHighLighted.classList.remove(progressCss[1]);
            prevHighLighted.classList.replace(progressCss[2], 'border-White')
            nextHighlighted.classList.replace(progressCss[0], 'text-White');
            nextHighlighted.classList.remove(progressCss[1]);
            nextHighlighted.classList.replace(progressCss[2], 'border-White')
            highlighted.classList.replace('text-White', progressCss[0]);
            highlighted.classList.add(progressCss[1]);
            highlighted.classList.replace('border-White', progressCss[2]);

        } else {
            const prevHighLighted = progressDivArray[currPage - 2].children.item(0);
            const highlighted = progressDivArray[currPage - 1].children.item(0);
            prevHighLighted.classList.replace(progressCss[0], 'text-White');
            prevHighLighted.classList.remove(progressCss[1]);
            prevHighLighted.classList.replace(progressCss[2], 'border-White')
            highlighted.classList.replace('text-White', progressCss[0]);
            highlighted.classList.add(progressCss[1]);
            highlighted.classList.replace('border-White', progressCss[2]);
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
    if (currPage === 3 && triggerId === 'next_step') {
        document.getElementById('next_step').classList.add('hidden');
        document.getElementById('confirm').classList.remove('hidden');
        handleCard4();
    } else if (currPage === 3 && triggerId === 'prev_step') {
        document.getElementById('next_step').classList.remove('hidden');
        document.getElementById('confirm').classList.add('hidden');
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
        if (triggerId === 'confirm') {
            currPage += 1;
            const currCard = document.getElementById(`card${currPage-1}`);
            const nextCard = document.getElementById(`card${currPage}`);
            currCard.classList.add('hidden');
            currCard.classList.remove('flex');
            nextCard.classList.add('flex');
            nextCard.classList.remove('hidden')
            document.getElementById('prev_step').classList.remove('hidden');
            if (currPage === 5) {
                document.querySelector('.button_class').style.display = 'none'
            }
        }
    } catch (error) {
        alert(error);
    }
}
const buttons_div = document.querySelector('.button_class');
buttons_div.addEventListener('click', (event) => moveForms(event));

const checkBox = document.getElementById('checkBox');
checkBox.checked = false;
checkBox.addEventListener('change', (event) => handleToggle(event));

const cardsContainer = document.getElementById('subscription_container');
cardsContainer.addEventListener('click', (event) => handleCard2(event));

const serviceCheckboxes = document.querySelectorAll('.service_checkbox');
serviceCheckboxes.forEach(checkbox => checkbox.checked = false);
const serviceContainer = document.getElementById('card3');
serviceContainer.addEventListener('change', (event) => handleServices(event));

changeProgress(currPage);