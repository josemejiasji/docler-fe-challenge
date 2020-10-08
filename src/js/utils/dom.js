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