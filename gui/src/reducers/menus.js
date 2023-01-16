const OPEN_MENU = 'scratch-gui/menus/OPEN_MENU';
const CLOSE_MENU = 'scratch-gui/menus/CLOSE_MENU';

const MENU_ACCOUNT = 'accountMenu';
const MENU_FILE = 'fileMenu';
const MENU_EDIT = 'editMenu';
const MENU_LANGUAGE = 'languageMenu';
const MENU_LOGIN = 'loginMenu';
const MENU_HELP = 'helpMenu';

const MENU_TIPS_LANGUAGE = 'tips_languageMenu';
const MENU_LESSONS = 'lessonsMenu';
const MENU_PROJECTS = 'projectsMenu';
const MENU_COURSES = 'coursesMenu';

const initialState = {
    [MENU_ACCOUNT]: false,
    [MENU_FILE]: false,
    [MENU_EDIT]: false,
    [MENU_LANGUAGE]: false,
    [MENU_LOGIN]: false,
    [MENU_HELP]: false,
    [MENU_TIPS_LANGUAGE]: false,
    [MENU_LESSONS]: false,
    [MENU_PROJECTS]: false,
    [MENU_COURSES]: false,
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case OPEN_MENU:
        return Object.assign({}, state, {
            [action.menu]: true
        });
    case CLOSE_MENU:
        return Object.assign({}, state, {
            [action.menu]: false
        });
    default:
        return state;
    }
};
const openMenu = menu => ({
    type: OPEN_MENU,
    menu: menu
});
const closeMenu = menu => ({
    type: CLOSE_MENU,
    menu: menu
});
const openAccountMenu = () => openMenu(MENU_ACCOUNT);
const closeAccountMenu = () => closeMenu(MENU_ACCOUNT);
const accountMenuOpen = state => state.scratchGui.menus[MENU_ACCOUNT];
const openFileMenu = () => openMenu(MENU_FILE);
const closeFileMenu = () => closeMenu(MENU_FILE);
const openHelpMenu = () => openMenu(MENU_HELP);
const closeHelpMenu = () => closeMenu(MENU_HELP);
const fileMenuOpen = state => state.scratchGui.menus[MENU_FILE];
const helpMenuOpen = state => state.scratchGui.menus[MENU_HELP];
const openEditMenu = () => openMenu(MENU_EDIT);
const closeEditMenu = () => closeMenu(MENU_EDIT);
const editMenuOpen = state => state.scratchGui.menus[MENU_EDIT];
const openLanguageMenu = () => openMenu(MENU_LANGUAGE);
const closeLanguageMenu = () => closeMenu(MENU_LANGUAGE);
const languageMenuOpen = state => state.scratchGui.menus[MENU_LANGUAGE];
const openLoginMenu = () => openMenu(MENU_LOGIN);
const closeLoginMenu = () => closeMenu(MENU_LOGIN);
const loginMenuOpen = state => state.scratchGui.menus[MENU_LOGIN];

const openTipsLanguageMenu = () => openMenu(MENU_TIPS_LANGUAGE);
const closeTipsLanguageMenu = () => closeMenu(MENU_TIPS_LANGUAGE);
const languageTipsMenuOpen = state => state.scratchGui.menus[MENU_TIPS_LANGUAGE];

const openLessonsMenu = () => openMenu(MENU_LESSONS);
const closeLessonsMenu = () => closeMenu(MENU_LESSONS);
const lessonsMenuOpen = state => state.scratchGui.menus[MENU_LESSONS];

const openProjectsMenu = () => openMenu(MENU_PROJECTS);
const closeProjectsMenu = () => closeMenu(MENU_PROJECTS);
const projectsMenuOpen = state => state.scratchGui.menus[MENU_PROJECTS];

const openCoursesMenu = () => openMenu(MENU_COURSES);
const closeCoursesMenu = () => closeMenu(MENU_COURSES);
const coursesMenuOpen = state => state.scratchGui.menus[MENU_COURSES];

export {
    reducer as default,
    initialState as menuInitialState,
    openAccountMenu,
    closeAccountMenu,
    accountMenuOpen,
    openFileMenu,
    closeFileMenu,
    fileMenuOpen,
    openHelpMenu,
    closeHelpMenu,
    helpMenuOpen,
    openEditMenu,
    closeEditMenu,
    editMenuOpen,
    openLanguageMenu,
    closeLanguageMenu,
    languageMenuOpen,
    openLoginMenu,
    closeLoginMenu,
    loginMenuOpen,
    
    openTipsLanguageMenu,
    closeTipsLanguageMenu,
    languageTipsMenuOpen,

    openLessonsMenu,
    closeLessonsMenu,
    lessonsMenuOpen,

    openProjectsMenu,
    closeProjectsMenu,
    projectsMenuOpen,

    openCoursesMenu,
    closeCoursesMenu,
    coursesMenuOpen
};
