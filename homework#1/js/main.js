var start = {
    button: document.querySelectorAll('.start'),
    container: document.querySelectorAll('.content'),
    wrapper: document.querySelectorAll('.content__wrapper'),
    limitX: 0,
    limitY: 0,
    offsetX: 0,
    offsetY: 0,
    createdContainer: '',
    createdContainerWidth: 0,
    createdContainerHeight: 0,
    activeElement: null,

    setupListener: function() {
        var __this = this;

        this.button[0].addEventListener('click', function(event) {
            event.preventDefault();

            __this.hideButton();
            __this.showContainer();

            setTimeout(function() {

                __this.setup();
                __this.setupRectangle();

            }, 500);
        });

        this.createdContainer.addEventListener('mousedown', this.mDown);

        this.createdContainer.addEventListener('mouseup', this.mUp);

        this.wrapper[0].addEventListener('mousemove', this.mMove);

        this.container[0].addEventListener('mousedown', this.active);

        this.container[0].addEventListener('mouseup', this.default);

        window.onresize = this.setup;
    },
    setup: function() {
        start.limitX = start.wrapper[0].offsetWidth;
        start.limitY = start.wrapper[0].offsetHeight;
    },
    hideButton: function() {
        var __this = this;

        this.button[0].style.opacity = 0;

        setTimeout(function() {
            __this.button[0].style.display = 'none';
        }, 300);
    },
    showContainer: function() {
        this.container[0].classList.toggle('inited');
    },
    createRectangle: function() {
        this.createdContainer = document.createElement('div');
        this.wrapper[0].appendChild(this.createdContainer);
    },
    setupRectangle: function() {
        this.createdContainerWidth = parseInt(Math.random() * (this.limitX / 4 - 100) + 100);
        this.createdContainerHeight = parseInt(Math.random() * (this.limitY / 4 - 100) + 100);

        var color = this.createColor(),
            left = parseInt(Math.random() * (this.limitX - this.createdContainerWidth - 1) + 1),
            top = parseInt(Math.random() * (this.limitY - this.createdContainerHeight - 1) + 1);

        this.createdContainer.classList.toggle('dragBox');
        this.createdContainer.style.width = this.createdContainerWidth + 'px';
        this.createdContainer.style.height = this.createdContainerHeight + 'px';
        this.createdContainer.style.transform = 'translate3d('+ left +'px, '+ top +'px, 0px)';
        this.createdContainer.style.backgroundColor = color;
    },
    mDown: function(event) {
        start.activeElement = event.target;
        start.offsetX = event.offsetX;
        start.offsetY = event.offsetY;
    },
    mUp: function(event) {
        start.activeElement = null;
    },
    mMove: function(event) {
        var left = event.layerX - start.offsetX,
            top = event.layerY - start.offsetY;

        if (left < 0) {
            left = 0;
        }

        if (left > start.limitX - start.createdContainerWidth) {
            left = start.limitX - start.createdContainerWidth;
        }

        if (top < 0) {
            top = 0;
        }

        if (top > start.limitY - start.createdContainerHeight) {
            top = start.limitY - start.createdContainerHeight;
        }

        if (start.activeElement) {

            start.createdContainer.style.transform = 'translate3d('+ left +'px, '+ top +'px, 0px)';

        }
    },
    createColor: function() {
        return '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
    },
    active: function(event) {
        event.currentTarget.classList.toggle('active');
    },
    default: function(event) {
        event.currentTarget.classList.toggle('active');
    },
    init: function() {
        this.createRectangle();
        this.setupListener();
    }
};

if (start.button.length) {
    start.init();
}