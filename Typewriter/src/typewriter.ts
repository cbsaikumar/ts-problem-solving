type QueueItem = () => Promise<void>

export default class Typewriter {
    private _element: HTMLElement
    private _loop: boolean
    private _typingDelay: number
    private _clearingDelay: number
    private _tasksQueue: QueueItem[] = []
    constructor(element: HTMLElement, {loop = false, typingDelay = 50, clearingDelay = 50}){
        this._element = element
        this._loop = loop
        this._typingDelay = typingDelay
        this._clearingDelay = clearingDelay
    }

    type(string: string){
        this._tasksQueue.push(() => {
            return new Promise<void>((resolve) => {
                let charsCount = 0
                const interval = setInterval(() => {
                    const textContent = string[charsCount]
                    this._element.append(textContent)
                    charsCount++
                    if(charsCount === string.length) {
                        clearInterval(interval)
                        resolve()
                    }
                }, this._typingDelay)
            })
        })
        return this
    }

    clearAll(){
        this._tasksQueue.push(() => {
            return new Promise<void>((resolve) => {
                const interval = setInterval(() => {
                    const innerText = this._element.innerText
                    let innerTextLen = innerText.length
                    this._element.innerText = innerText.substring(0, --innerTextLen)
                    if(!innerTextLen){
                        clearInterval(interval)
                        resolve()
                    }
                }, this._clearingDelay)
            })
        })

        return this
    }

    clear(number: number){
        this._tasksQueue.push(() => {
            return new Promise<void>((resolve) => {
                const initialLen = this._element.innerText.length
                const interval = setInterval(() => {
                    const innerText = this._element.innerText
                    let innerTextLen = innerText.length
                    this._element.innerText = innerText.substring(0, --innerTextLen)
                    if(initialLen - innerTextLen === number){
                        clearInterval(interval)
                        resolve()
                    }
                }, this._clearingDelay)
            })
        })
        return this
    }

    async start(){
        console.log(this._tasksQueue)
        while(this._tasksQueue.length){
            const cb = this._tasksQueue[0]
            this._tasksQueue.shift()
            await cb()
            if(this._loop){
                this._tasksQueue.push(cb)
            }
        }
        return this
    }
}