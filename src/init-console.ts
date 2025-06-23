import { environment } from './environments/environment';

export function initializeConsole() {

    if (environment.production) {
        let consoleStyle ='color: red;' + 'font-size: 60px;' + 'font-weight: bold;';
        setTimeout(console.log.bind(console, '%cStop!', consoleStyle), 0);
        setTimeout(
            console.log.bind(
                console,
                'This is a browser feature intended for'
            ), 0);
        window.console.log = () => { };
    }
}
