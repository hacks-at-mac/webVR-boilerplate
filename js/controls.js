var KEY = {
    SHIFT: 16,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    A: 65,
    D: 68,
    S: 83,
    W: 87,

    state: new Array(256).fill(0),

    keydown: function(ev) {
        console.log(ev.keyCode);
        KEY.state[ev.keyCode] = 1;
    },

    keyup: function(ev) {
        KEY.state[ev.keyCode] = 0;
    }
};

document.addEventListener('keydown', KEY.keydown);
document.addEventListener('keyup', KEY.keyup);
