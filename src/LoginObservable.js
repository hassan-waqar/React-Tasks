class LoginObservable {
    constructor() {
        this.observers = []
    }

    subscribe(func){
        this.observers.push(func)
    }

    unsubscribe(func) {
        this.observers = this.observers.filter((each) => each !== func)
    }

    notify(value) {
        this.observers.forEach((observer) => {
            observer(value)
        })
    }
}

export default new LoginObservable