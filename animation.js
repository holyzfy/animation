var className = 'animation';

function parallel(...targets) {
    return flow('all', targets);
}

function race(...targets) {
    return flow('race', targets);
}

function flow(type, targets) {
    targets = targets.map(item => getElement(item)).reduce((x, y) => x.concat(y));
    var promises = targets.map(el => new Promise(resolve => el.addEventListener('transitionend', resolve)));
    targets.forEach(el => el.classList.add(className));
    return Promise[type](promises);
}

function series(...targets) {
    targets = targets.map(item => getElement(item)).reduce((x, y) => x.concat(y));
    var promises = targets.map(el => new Promise(resolve => el.addEventListener('transitionend', resolve)));
    for(let i = 0, length = promises.length; i < length - 1; i++) {
        promises[i].then(() => targets[i + 1].classList.add(className));
    }
    targets[0].classList.add(className);
    return Promise.all(promises);
}

function getElement(selector) {
    if(typeof selector === 'string') {
        return Array.from(document.querySelectorAll(selector));
    }
    if(selector.length >= 0) {
        return Array.from(selector);
    }
    return selector;
}

export default {
    parallel,
    race,
    series
};