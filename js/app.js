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
* @param {string} id (args[0])- identifier of the new element (optional).
* @param {string} className (args[1]) - the class name of the new element (optional).
* @param {string} text (args[2]) - inner text for the element (optional).
* @returns {Node} - new HTML element
*/
const createNewElement = (tag, ...args) => {
    let newElement = document.createElement(tag);
    args[0] !== undefined ? newElement.id = args[0] : null;
    args[1] !== undefined ? newElement.classList.add(args[1]) : null;
    args[2] !== undefined ? newElement.innerText = args[2] : null;

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
 * @description Determine if an element is in the viewport.
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node} elem - The element
 * @return {boolean} Returns true if element is in the viewport
 */
const isInViewport = function (elem) {
    let distance = elem.getBoundingClientRect();
    return (
        distance.top >= 0 && distance.left >= 0 &&
        distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
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
* @returns {Node} - new <a> tag.
*/
const createMenuLink = (link, className, text) => {
    let newlink = createNewElement('a', '', className, text);
    newlink.setAttribute('href', `#${link}`);
    newlink.setAttribute('id', `link_${link}`);

    return newlink;
};

/**
* @description Creating navigation bar elements using <li> tags.
* @param {string} id - identifier names to create a link to it.
* @param {string} name - text for tag <a>.
* @returns {Node} - new <li> tag with the <a> tag inside.
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

    section.forEach((item, index) => {
        let id = section[index].getAttribute('id');
        let name = section[index].dataset.nav;
        let newListItem = createMenuList(id, name);

        fragmentMenu.appendChild(newListItem);
    });

    navMenu.appendChild(createMenuList('top', 'Home'));
    navMenu.appendChild(fragmentMenu);
};

/**
* @description Add the 'active' class to the Main Menu items.
* @param {string} id - id of the active section.
*/
const activeMenuItem = (id) => {
    const menuLihks = document.querySelectorAll('.menu__link');

    menuLihks.forEach(itemLink => {
        let currentLink = itemLink.getAttribute('id').split('_')[1];
        itemLink.classList.remove('active');

        if(currentLink === id) {
 
            itemLink.classList.add('active');
        } else if(id === 'top'){
            menuLihks[1].classList.remove('active');
            menuLihks[0].classList.add('active');
        } else {
            itemLink.classList.remove('active');
        }
    });
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

            let currentId = itemLink.getAttribute('href').slice(1);
            scrollContent(currentId);
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
    const firstSection = section[0].getAttribute('id')

    let positionTop = (window.pageYOffset !== undefined) ?
        window.pageYOffset :
        (document.documentElement ||
        document.body.parentNode ||
        document.body).scrollTop;

    section.forEach(itemSection => {
        let currentId = itemSection.getAttribute('id');

        if(isInViewport(itemSection)){
            if(currentId === firstSection && positionTop < 350) {
                activeMenuItem('top');
            } else {
                activeMenuItem(currentId);
                activeSection(currentId);
            }
        }
    });

    toggleScrollUp(scrollTop, positionTop, 400);
    toggleHeader(pageHeader, positionTop, 600);
    statePosition = positionTop;
};


// Build MainMenu.
buildMenu();

// Add ScrollUp button.
createScrollUp();

// Set Sections as active.
activeLinks();
