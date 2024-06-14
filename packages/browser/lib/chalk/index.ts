
const chalk = {
    log(content: string) {
        console.log(content);
    },
    ...['red', 'yellow', 'green', 'blue'].reduce((acc, color) => {
        return {
            ...acc,
            [color]: (content:string) => `/c${color}${content}c/`
        }
    }, {})
};

export default chalk;