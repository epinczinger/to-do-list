import './style/style.scss'

const content = document.querySelector('.content');
const title = document.createElement('h1');
title.textContent = 'This is a test';

content.appendChild(title);
