class Dropdown {
    constructor() {
        this.body = document.body;
        this.box = document.createElement('div');
        this.menuBox = document.createElement('div');

        this.menuItemStyle = '';
        this.menuItemStyleHover = '';
        this.isShow = false;
    }

    setBoxStyle(style) {
        this.box.style = style || '';

    }

    setMenuItemStyle(style) {
        this.menuItemStyle = style || '';
    }

    setMenuItemHoverStyle(style) {
        this.menuItemStyleHover = style || '';
    }

    show(opt = {}) {

        if (this.isShow) {
            this.hide();
            return;
        }

        this.isShow = true;
        this.box.style.position = 'absolute';
        this.box.style.zIndex = opt.zIndex || '999999';

        this.box.style.overflow = 'auto';
        this.box.style.maxHeight = opt.maxHeight || '9rem';
        this.box.style.left = opt.left || '0';
        this.box.style.top = opt.top || '0';
        this.box.style.width = opt.width || '200px';

        this.body.appendChild(this.box);


        for (let item of opt.list) {

            let itemEl = document.createElement('div');
            itemEl.style = this.menuItemStyle;
            itemEl.innerText = item.label;

            this.menuBox.appendChild(itemEl);

            itemEl.addEventListener('click', () => {
                this.hide();
                if (opt.onSelect) opt.onSelect(item);
            });

            itemEl.addEventListener('mouseover', () => {
                itemEl.style = this.menuItemStyle + this.menuItemStyleHover;
            });

            itemEl.addEventListener('mouseout', () => {
                itemEl.style = this.menuItemStyle;
            });

        }

        this.box.appendChild(this.menuBox);

        const documentClick = () => {
            this.hide();
            document.removeEventListener('click', documentClick);
        };

        document.addEventListener('click', documentClick);

    }


    hide() {
        if (!this.isShow) return;
        this.body.removeChild(this.box);
        this.menuBox.innerHTML = '';
        this.box.innerHTML = '';
        this.isShow = false;
    }

    dispose() {

    }

}

export default new Dropdown();