/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
'use strict';

const section = document.querySelectorAll('section');
const pageHeader = document.querySelector('.page__header');
const navMenu = document.getElementById('navbar__list');
let fragmentMenu = document.createDocumentFragment();
let statePosition = 0;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
* @description Helper for create new html element.
* @param {string} tag - the name of the tag of the new element.
* @param {string} id - identifier of the new element (optional).
* @param {string} className - the class name of the new element (optional).
* @param {string} text - inner text for the element (optional).
* @returns {object} - new HTML element
*/
const createNewElement = (tag, id='', className='',  text='') => {
    let newElement = document.createElement(tag);

    id !== '' ? newElement.id = id : null;
    className !== '' ? newElement.classList.add(className) : null;
    text !== '' ? newElement.innerText = text : null;

    return newElement;
};

/**
* @description Smooth scroll to the active section.
* @param {string} id - identifier of the block to which smooth scrolling occurs.
*/
const scrollContent = (id) => {
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
* @description Create a link with the <a> tag.
* @param {string} link - specifying an anchor to refer to an element.
* @param {string} className - the class name of the new element.
* @param {string} text - inner text for the element.
* @returns {object} - new <a> tag.
*/
const createMenuLink = (link, className, text) => {
    let newlink = createNewElement('a', '', className, text);
    newlink.setAttribute('href', `#${link}`);

    return newlink;
};

/**
* @description Creating navigation bar elements using <li> tags.
* @param {string} id - identifier names to create a link to it.
* @param {string} name - text for tag <a>.
* @returns {object} - new <li> tag with the <a> tag inside.
*/
const createMenuList = (id, name) => {
    let listItem = createNewElement('li');
    let listLink = createMenuLink(id, 'menu__link', name);

    // Add class "active" to the first menu item
    id === 'top' ? listLink.classList.add('active') : null;

    listItem.appendChild(listLink);
    return listItem;
};

/**
* @description Build list menu and add tag <ul>
*/
const buildMenu = () => {

    // const startingTime = performance.now();

    section.forEach((item, index) => {
        let id = section[index].getAttribute('id');
        // let name = section[index].getAttribute('data-nav');
        let name = section[index].dataset.nav;
        let newListItem = createMenuList(id, name);

        fragmentMenu.appendChild(newListItem);
    });

    // const endingTime = performance.now();
    // console.log(`This code took ${(endingTime - startingTime).toFixed(3)} milliseconds.`);

    navMenu.appendChild(createMenuList('top', 'Home'));
    navMenu.appendChild(fragmentMenu);
};

/**
* @description Add the 'active-section' class to the section when it is at
*              the top of the viewport
* @param {string} id - id of the active section to which the class will be connected.
*/
const activeSection = (id) => {
    section.forEach(itemSection => {
        let currentSection = itemSection.getAttribute('id');
        itemSection.classList.remove('active-section');

        if(currentSection === id) {
            itemSection.classList.add('active-section');
        } else if(id === 'top'){
            section[0].classList.add('active-section');
        } else {
            itemSection.classList.remove('active-section');
        }
    });
};

/**
* @description Сreate a ScrollUp button and add an event listener to it.
*/
const createScrollUp = () => {
    let scrollBox = createNewElement('div', 'scroll-up');
    let scrollLink = createNewElement('a', '', 'scroll-link');

    scrollLink.setAttribute('href', '#top');
    scrollLink.innerText = 'UP';
    handleScrollUp(scrollLink);

    scrollBox.appendChild(scrollLink);
    document.body.appendChild(scrollBox);
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

/**
* @description Add event listener 'click' for the MainMenu.
*/
const activeLinks = () => {
    const menuLihks = document.querySelectorAll('.menu__link');

    menuLihks.forEach(itemLink => {

        itemLink.addEventListener('click', (e) => {
            e.preventDefault();

            let currentLihk = document.querySelector('.active');
            currentLihk.classList.remove('active');
            
            if(itemLink.classList.contains('active')){
                itemLink.classList.remove('active');
            }else {
                itemLink.classList.add('active');
                let currentId = itemLink.getAttribute('href').slice(1);

                activeSection(currentId);
                scrollContent(currentId);

                /**
                 * Another option for implementing menu animation
                 */
                // pageHeader.style.opacity = 0; 
                // pageHeader.style.visibility = 'hidden';

                // setTimeout(() => {
                //     pageHeader.style.opacity = 1;
                //     pageHeader.style.visibility = 'visible';
                // }, 1500);
            }
        });	
    });
};

/**
* @description Set up an event listener for the ScrollUp button.
* @param {object} scrollLink - the object to which the event listener 
* will be connected with a set of expressions for execution.
*/
const handleScrollUp = (scrollLink) => {

    scrollLink.addEventListener('click', (e) => {
        e.preventDefault();

        let menuLihks = document.querySelectorAll('.menu__link');
        let currentLihk = document.querySelector('.active');

        currentLihk.classList.remove('active');
        menuLihks[0].classList.add('active');

        scrollContent('top');
    });
};

/**
* @description Setting the properties of the "ScrollUp" button
* when scrolling a page.
* @param {object} item - element to which properties are applied.
* @param {number} pos - current distance from top of page.
* @param {number} size - customizable distance from the top of the page.
*/
const toggleScrollUp = (item, pos, size) => {
    if (pos > size) {        
        item.style.opacity = 1;
        item.style.visibility = 'visible';
    } else {
        item.style.opacity = 0;
        item.style.visibility = 'hidden';
    }
};

/**
* @description Setting the properties of the Header and MainMenu
* when scrolling a page.
* @param {object} item - element to which properties are applied.
* @param {number} pos - current distance from top of page.
* @param {number} size - customizable distance from the top of the page.
*/
const toggleHeader = (item, pos, size) => {

    if (pos > size && pos > statePosition) {
        item.style.opacity = 0; 
        item.style.visibility = 'hidden';
    } else {            
        item.style.opacity = 1;
        item.style.visibility = 'visible';
    }
};

/**
* @description We track the position of the page when scrolling and change
* the properties of the elements.
*/
window.onscroll = () => {
    const scrollTop = document.querySelector('#scroll-up');

    let positionTop = (window.pageYOffset !== undefined) ?
        window.pageYOffset :
        (document.documentElement ||
        document.body.parentNode ||
        document.body).scrollTop;

    toggleScrollUp(scrollTop, positionTop, 400);
    // Comment out the lines below in the second version of the menu animation
    toggleHeader(pageHeader, positionTop, 800); 
    statePosition = positionTop;
};

// Build MainMenu.
buildMenu();

// Add ScrollUp button.
createScrollUp();

// Set Sections as active.
activeLinks();
