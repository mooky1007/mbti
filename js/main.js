const data = [
    {
        type: 'ei',
        q: '당신은 얼마나 멀리까지 비출 수 있나요?',
        a: ['멀리까지 환히 비출 수 있어요!', '가까운 곳만 은은히 비추는 게 좋아요.'],
    },
    {
        type: 'ei',
        q: '당신은 어떤 모습으로 관찰되길 원하나요?',
        a: ['반짝이며 많은 존재들이 주목하길 원해요.', '조용히, 천천히 알아봐 주길 원해요.'],
    },
    {
        type: 'ei',
        q: '당신이 속한 우주에서, 당신은 어떻게 행동하나요?',
        a: ['다른 별들과 활발히 상호작용하며 스스로를 빛내요.', '스스로 고요히 존재하며, 나를 찾는 이들에게만 모습을 보여줘요.'],
    },
    {
        type: 'ft',
        q: '어떤 에너지가 당신을 움직이게 하나요?',
        a: ['주변 존재들의 따뜻한 관심과 유대감', '스스로 정한 논리적이고 명확한 목표'],
    },
    {
        type: 'ft',
        q: '우주에 메시지를 보낸다면, 어떤 말을 할 건가요?',
        a: ['우리는 함께 빛날 수 있어요!', '나는 여기 있어요.'],
    },
    {
        type: 'ft',
        q: '어떤 방식으로 다른 존재들에게 영향을 미치나요?',
        a: ['감정에 공감해주고, 힘을 북돋아줘요.', '실질적인 해결방안을 제시해요.'],
    },
];

let currentIdx = 0;

const current = document.querySelector('#current');
const max = document.querySelector('#max');
const text = document.querySelector('#question');
const img = document.querySelector('#image img');
const buttonWrap = document.querySelector('.button_area');
const answer01 = document.querySelector('#answer01');
const answer02 = document.querySelector('#answer02');

const renderQuestion = () => {
    current.innerText = currentIdx + 1;
    max.innerText = data.length;
    progress.style.width = `${((currentIdx + 1) / data.length) * 100}%`;
    img.setAttribute('src', `./assets/images/q${currentIdx + 1}.png`);
    text.innerText = data[currentIdx].q;
    answer01.innerText = data[currentIdx].a[0];
    answer02.innerText = data[currentIdx].a[1];
};

const changeQuestion = () => {};

const submitAnswer = (e) => {
    if (currentIdx >= data.length - 1) return;

    outAnimation();
    setTimeout(() => {
        currentIdx++;
        renderQuestion();
    }, 500);
};

const outAnimation = () => {
    text.classList.add('fade-up');
    img.classList.add('fade-up');
    buttonWrap.classList.add('fade-up');

    setTimeout(() => {
        text.classList.remove('fade-up');
        img.classList.remove('fade-up');
        buttonWrap.classList.remove('fade-up');
        inAnimation();
    }, 600);
};

const inAnimation = () => {
    text.classList.add('fade-down');
    img.classList.add('fade-down');
    buttonWrap.classList.add('fade-down');

    setTimeout(() => {
        text.classList.add('fade-down');
        img.classList.add('fade- down');
        buttonWrap.classList.add('fade-down');
    }, 600);
};

const startTest = () => {
    outAnimation();
    setTimeout(() => {
        answer01.removeAttribute('onclick');
        answer02.removeAttribute('style');

        answer01.addEventListener('click', submitAnswer);
        answer02.addEventListener('click', submitAnswer);
        document.querySelector('.top_area').removeAttribute('style');
        renderQuestion();
    }, 500);
};
