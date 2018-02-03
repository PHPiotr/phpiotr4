import app from '../../reducers/appReducer';
import * as appActionTypes from '../../actions/app/appActionTypes';
import expect from 'expect';
import freeze from 'deep-freeze';

describe('App reducer', () => {
    it(`should set ${appActionTypes.TOGGLE_IS_DRAWER_OPEN} action type when drawer to be toggled on`, () => {
        const action = {type: appActionTypes.TOGGLE_IS_DRAWER_OPEN};
        const before = {isDrawerOpen: false};
        const after = {isDrawerOpen: true};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(app(before, action)).toEqual(after);
    });
    it(`should set ${appActionTypes.TOGGLE_IS_DRAWER_OPEN} action type when drawer to be toggled off`, () => {
        const action = {type: appActionTypes.TOGGLE_IS_DRAWER_OPEN};
        const before = {isDrawerOpen: true};
        const after = {isDrawerOpen: false};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(app(before, action)).toEqual(after);
    });
});
