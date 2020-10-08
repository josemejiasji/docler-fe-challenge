export const generateRandonUserName = () => {
    return `guest${Math.floor(Math.random() * 99999)}`
}

export const createElement = (params) => {
    const {tag, className, content} = params;

    const el = document.createElement(tag);
    el.className = className;
    el.innerHTML = content;

    return el;
}

export const scrollToBottom = (el) => {
    el.scrollTop =  el.scrollHeight;
}