import app from '../../reducers/appReducer';
import * as appActionTypes from '../../actions/app/appActionTypes';
import expect from 'expect';
import freeze from 'deep-freeze';
import {HOME} from '../../constants';

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
    it(`should set ${appActionTypes.SET_APP_BAR_TITLE} action type when app bar title to be set`, () => {
        const payload = 'Expected app bar title';
        const action = {type: appActionTypes.SET_APP_BAR_TITLE, payload};
        const before = {appBarTitle: ''};
        const after = {appBarTitle: payload};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(app(before, action)).toEqual(after);
    });
    it(`should set ${appActionTypes.SET_APP_BAR_TITLE} action type when app bar title to be set to default`, () => {
        const defaultAppBarTitle = HOME;
        const action = {type: appActionTypes.SET_APP_BAR_TITLE};
        const before = {appBarTitle: defaultAppBarTitle};
        const after = {appBarTitle: defaultAppBarTitle};
        freeze(action);
        freeze(before);
        freeze(after);
        expect(app(before, action)).toEqual(after);
    });
    it('should return initial state when unknown action type', () => {
        const initialState = {
            appBarTitle: HOME,
            isDrawerOpen: false,
            isArrowBackVisible: false,
        };
        const action = {type: 'UNKNOWN_ACTION'};
        const before = initialState;
        const after = initialState;
        freeze(action);
        freeze(before);
        freeze(after);
        expect(app(before, action)).toEqual(after);
        expect(app(undefined, action)).toEqual(after);
    });
    it(`should create ${appActionTypes.TOGGLE_ARROW_BACK}`, () => {
        const action = {
            type: appActionTypes.TOGGLE_ARROW_BACK,
        };
        const before = {
            isArrowBackVisible: false,
        };
        const after = {
            isArrowBackVisible: true,
        };
        freeze(action);
        freeze(before);
        freeze(after);
        expect(app(before, action)).toEqual(after);
    });
});
