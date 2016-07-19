var start = {
    button: document.querySelectorAll('.start'),
    container: document.querySelectorAll('.content'),
    limitX: 0,
    limitY: 0,
    createdContainer: '',

    setupListener: function() {
        var __this = this;

        this.button[0].addEventListener('click', function(event) {
            event.preventDefault();

            __this.hideButton();
            __this.showContainer();

            setTimeout(function() {

                __this.setup();
                __this.createRectangle();

            }, 500);
        });

        window.onresize = this.setup;
    },
    setup: function() {
        start.limitX = start.container[0].offsetWidth;
        start.limitY = start.container[0].offsetHeight;
    },
    hideButton: function() {
        this.button[0].style.opacity = 0;
    },
    showContainer: function() {
        this.container[0].classList.toggle('inited');
    },
    createRectangle: function() {
        var width = parseInt(Math.random() * (this.limitX / 3 - 100) + 100);
            height = parseInt(Math.random() * (this.limitY / 3 - 100) + 100);
            color = this.createColor();

        console.log(width);
        console.log(height);

        this.createdContainer = document.createElement('div');
        this.createdContainer.classList.toggle('dragBox');
        this.createdContainer.style.width = width + 'px';
        this.createdContainer.style.height = height + 'px';
        this.createdContainer.style.backgroundColor = color;
        this.container[0].appendChild(this.createdContainer);

    },
    createColor: function() {
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    },
    init: function() {
        this.setupListener();
    }
};

if (start.button.length) {
    start.init();
}