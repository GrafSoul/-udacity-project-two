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
const section = document.querySelectorAll('section');
const navMenu = document.getElementById('navbar__list');
let fragmentMenu = document.createDocumentFragment();

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
    section.forEach((item, index) => {
        let id = section[index].getAttribute('id');
        let name = section[index].getAttribute('data-nav');
        let newListItem = createMenuList(id, name);

        fragmentMenu.appendChild(newListItem);
    });

    navMenu.appendChild(createMenuList('top', 'Home'));
    navMenu.appendChild(fragmentMenu);
};


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build MainMenu.
buildMenu();

// Scroll to section on link click

// Set sections as active
