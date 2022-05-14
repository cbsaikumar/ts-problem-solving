import './style.css'

import Typewriter from './typewriter'

const app = document.querySelector<HTMLDivElement>('#app')!

const typeWriter = new Typewriter(app, { loop: true, typingDelay: 100 })

typeWriter.type('\nType something!').clear(10).type('something!').type('\nType some\tthing!').clearAll().type('\nWhat a great work!').clearAll().start()