class Signal {
    private listeners: { [key: string]: Function[] } = {};

    public on(name: string, callback: (data: any) => void): void {
        if (!this.listeners[name]) {
            this.listeners[name] = []
        }
        this.listeners[name].push(callback)
    }

    public off(name: string, callback: Function): void {
        if (this.listeners[name]) {
            this.listeners[name] = this.listeners[name].filter(fn => fn !== callback)
        }
    }

    public emit(name: string, data?: any): void {
        if (this.listeners[name]) {
            this.listeners[name].forEach(callback => callback(data))
        }
    }
}

const signal = new Signal()

export default signal
