import Typewriter from '../src/typewriter'

const element = document.createElement('div')
const typeWriter = new Typewriter(element, {typingDelay: 0, loop: false})

describe('Typewrite Functionality', () => {
    it('Should render the string on element after typing', () => {
        jest.useFakeTimers()
        jest.advanceTimersByTime(0);
        typeWriter.type('Hello World!')
        typeWriter.start()
        expect(element.innerText).toBe('Hello World!')
    })
})