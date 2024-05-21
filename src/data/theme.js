const theme = {
    palette: {
        mode: 'dark',
        primary: {
              main: '#96c2ff',
        },
        secondary: {
             main: '#e19fa1',
        },
        info: {
             main: '#8ec9ef',
        },
        text: {
             primary: '#f8faff',
        },
        success: {
              main: '#95dfaf',
        },
        warning: {
             main: '#eec988',
        },
        error: {
             main: '#d6bcfa',
        },
        background: {
            default: '#313545',
            paper: '#3b4252'
        },
        caption: {
            main: '#c8cace',
        }
    },
}

export function getTheme() {
    return theme;
}
