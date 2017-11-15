import {createMuiTheme} from 'material-ui/styles';

export default () => {
    return createMuiTheme({
        typography: {
            body1: {
                fontSize: '0.75rem',
            },
            subheading: {
                fontSize: '0.75rem',
            },
        },
    });
};