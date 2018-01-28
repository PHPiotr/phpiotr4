import expect from 'expect';
import * as appActions from '../../actions/app/appActions';
import * as appActionTypes from '../../actions/app/appActionTypes';

describe('App actions', () => {
    it('should create an action to toggle visibility of drawer', () => {
        const expectedAction = {
            type: appActionTypes.TOGGLE_IS_DRAWER_OPEN,
        };
        expect(appActions.toggleIsDrawerOpen()).toEqual(expectedAction);
    });
    it('should create an action to set app-bar title', () => {
        const expectedAppBarTitle = 'Hello World!';
        const expectedAction = {
            type: appActionTypes.SET_APP_BAR_TITLE,
            payload: expectedAppBarTitle,
        };
        expect(appActions.setAppBarTitle(expectedAppBarTitle)).toEqual(expectedAction);
    });
});
