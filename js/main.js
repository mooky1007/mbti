const data = [
    {
        type: 'ei',
        q: '밤하늘의 수많은 별들중 당신은 어떤 별인가요?',
        a: ['가장 밝게 빛나는 별', '밝진 않지만 늘 제자리에 있는 별'],
    },
    {
        type: 'ei',
        q: '당신의 별이 처음 발견되었어요.',
        a: ['많은 사람들이 주목하고 활발히 연구되길 원해요.', '주목 받진 않아도 꾸준히 연구되길 원해요.'],
    },
    {
        type: 'ei',
        q: '당신의 별 주위는 어떤가요?',
        a: ['많은 위성과 형제 행성들과 함께 존재해요.', '스스로 고요히 존재하고 있어요.'],
    },
    {
        type: 'ft',
        q: '어떤 에너지가 당신을 움직이게 하나요?',
        a: ['주변 존재들의 따뜻한 관심과 유대감', '스스로 정한 논리적이고 명확한 목표'],
    },
    {
        type: 'ft',
        q: '외계로 메시지를 보낼 수 있다면, 어떤 메세지를 보낼 건가요?',
        a: ['저는 여기 있어요!', '...'],
    },
    {
        type: 'ft',
        q: '당신은 어떤 방식으로 다른 사람들의 고민을 들어주나요?',
        a: ['공감해주고, 응원해줘요.', '실질적인 해결방안을 제시해요.'],
    },
];

let currentIdx = 0;

const hidden = { opacity: 0, transform: 'translateY(-10px)' };
const show = { opacity: 1, transform: 'translateY(0)' };
const animationConfig = { easing: 'ease-in-out', fill: 'both', duration: 600 };

const fadeIn = [hidden, show];
const fadeOut = [show, hidden];

const current = document.querySelector('#current');
const max = document.querySelector('#max');
const text = document.querySelector('#question');
const img = document.querySelector('#image img');
const buttonWrap = document.querySelector('.button_area');
const answer01 = document.querySelector('#answer01');
const answer02 = document.querySelector('#answer02');
const contentArea = document.querySelector('.content_area');

const renderQuestion = () => {
    current.innerText = currentIdx + 1;
    max.innerText = data.length;
    progress.style.transform = `scaleX(${(currentIdx + 1) / data.length})`;
    img.setAttribute('src', `./assets/images/q${currentIdx + 1}.png`);
    text.innerText = data[currentIdx].q;
    answer01.innerText = data[currentIdx].a[0];
    answer02.innerText = data[currentIdx].a[1];
};

const changeQuestion = () => {};

const submitAnswer = async (e) => {
    if (currentIdx >= data.length - 1) return;

    playAnimation([contentArea, text], fadeOut);
    await playAnimation([answer01, answer02], fadeOut, { delay: 100 });

    currentIdx++;
    renderQuestion();

    playAnimation([contentArea, text], fadeIn);
    playAnimation([answer01, answer02], fadeIn, { delay: 100 });
};

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

const startTest = async () => {
    await playAnimation([contentArea, text, answer01], fadeOut);

    answer01.removeAttribute('onclick');
    answer02.removeAttribute('style');

    answer01.addEventListener('click', submitAnswer);
    answer02.addEventListener('click', submitAnswer);
    document.querySelector('.top_area').removeAttribute('style');
    renderQuestion();

    playAnimation([contentArea, text, answer01, answer02], fadeIn);
};
