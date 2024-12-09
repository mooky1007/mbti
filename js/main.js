import { data, resultData } from '../data.js';

data.forEach((_, idx) => {
    const img = new Image();
    img.src = `./assets/images/q${idx + 1}.png`;
});

const mbti = () => {
    let currentIdx = 0;
    let isAnimation = false;

    const result = [];

    const show = { opacity: 1, transform: 'translateY(0)' };
    const show2 = { opacity: 1 };

    const hidden2 = { opacity: 0, transform: 'translateY(20px)' };
    const hidden3 = { opacity: 0 };

    const animationConfig = { easing: 'ease-in-out', fill: 'both', duration: 600 };

    const fadeUp = [hidden2, show];
    const fadeIn = [hidden3, show2];
    const fadeOut = [show2, hidden3];

    const current = document.querySelector('.progress_area p span:first-child');
    const max = document.querySelector('.progress_area p span:last-child');
    const progress = document.querySelector('.progress_bar .inner');
    const text = document.querySelector('.text_area p');
    const imageBox = document.querySelector('.image_box');
    const img = document.querySelector('.image_box img');
    const buttonWrap = document.querySelector('.button_area');

    const playAnimation = async (target, animation, config = {}) => {
        let targetArr;
        if (Array.isArray(target)) targetArr = target;
        else targetArr = [target];

        return Promise.all(
            targetArr.map((el) => {
                const animationOjb = el.animate(animation, { ...animationConfig, ...config });
                return animationOjb.finished;
            })
        );
    };

    const pageOut = async () => {
        if (isAnimation) return;
        isAnimation = true;
        await playAnimation([imageBox, buttonWrap, text], fadeOut);

        return true;
    };

    const pageIn = async () => {
        playAnimation(imageBox, fadeIn);
        await playAnimation(text, fadeUp);
        playAnimation(buttonWrap, fadeIn);
        isAnimation = false;
        return true;
    };
    const startTest = async () => {
        await pageOut();
        renderContent();
        pageIn();
    };

    const renderContent = (idx = 0) => {
        current.innerText = idx + 1;
        max.innerText = data.length;
        progress.style.transform = `scaleX(${(idx + 1) / data.length})`;
        img.setAttribute('src', `./assets/images/q${idx + 1}.png`);
        text.innerText = data[idx].q;

        buttonWrap.querySelectorAll('button').forEach((button) => button.remove());
        data[idx].a.forEach((a, idx) => {
            const button = document.createElement('button');
            button.innerText = a;
            button.addEventListener('click', (e) => submitAnswer(e, idx));
            buttonWrap.append(button);
        });
    };

    const renderResult = async (type = 'ef') => {
        console.log(type, result);
        document.querySelector('.top_area').style.display = 'none';
        buttonWrap.querySelectorAll('button').forEach((button) => button.remove());
        img.setAttribute('src', `./assets/images/${type}.png`);

        text.innerHTML = '';

        const title = document.createElement('h2');
        const desc = document.createElement('p');
        const ul = document.createElement('ul');
        title.textContent = resultData[type].name;
        desc.innerHTML = resultData[type].desc;
        resultData[type].list.forEach((listItem) => {
            const li = document.createElement('li');
            li.textContent = listItem;
            ul.append(li);
        });

        text.append(title, desc, ul);

        const button = document.createElement('button');
        button.innerText = '다시하기';
        button.addEventListener('click', (e) => restart);
        buttonWrap.append(button);
    };

    const submitAnswer = async (e, idx) => {
        if (isAnimation) return;
        await pageOut();

        result.push(data[currentIdx].type[idx]);

        if (result.length >= data.length) {
            renderResult();
        } else {
            currentIdx++;
            renderContent(currentIdx);
        }

        pageIn();
    };

    const restart = () => {
        currentIdx = 0;
        result = [];
    };

    buttonWrap.querySelector('button').addEventListener('click', startTest);
    renderResult();
};

mbti();
