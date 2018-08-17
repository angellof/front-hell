class View {
 
    constructor(element) {
        this._element = element;
    }

    template() {
        throw new Error('O método _template() deve ser implementado');
    }

    update(model) {
        console.log('chame update ' , model)
        this._element.innerHTML = this.template(model);
    }
}