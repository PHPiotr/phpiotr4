import expect from 'expect';
import dateFilter from '../../reducers/dateFilter';
import deepFreeze from 'deep-freeze';

describe('dateFilter', () => {

    it('should change type of "from" field (on focus) from "text" to "date"', () => {
        const action = {
            dateTypeName: "fromDateFieldType",
            dateTypeValue: "date",
            type: "SET_DATE_TYPE",
        };

        const beforeState = {
            fromDate: "",
            fromDateFieldType: "text",
            isDateFilterEnabled: true,
            toDate: "",
            toDateFieldType: "text",
        };

        const afterState = {
            fromDate: "",
            fromDateFieldType: "date",
            isDateFilterEnabled: true,
            toDate: "",
            toDateFieldType: "text",
        }

        deepFreeze(action);
        deepFreeze(beforeState);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });

    it('should set "from" date', () => {
        const action = {
            dateFieldName: "fromDate",
            dateFieldValue: "2017-05-01",
            type: "SET_DATE",
        };

        const beforeState = {
            fromDate: "",
            fromDateFieldType: "date",
            isDateFilterEnabled: true,
            toDate: "",
            toDateFieldType: "text",
        };

        const afterState = {
            fromDate: "2017-05-01",
            fromDateFieldType: "date",
            isDateFilterEnabled: true,
            toDate: "",
            toDateFieldType: "text",
        }

        deepFreeze(action);
        deepFreeze(beforeState);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });

    it('should set "from" date as empty string', () => {
        const action = {
            dateFieldName: "fromDate",
            dateFieldValue: "",
            type: "SET_DATE",
        };

        const beforeState = {
            fromDate: "2017-05-01",
            fromDateFieldType: "date",
            isDateFilterEnabled: true,
            toDate: "2017-05-31",
            toDateFieldType: "date",
        };

        const afterState = {
            fromDate: "",
            fromDateFieldType: "date",
            isDateFilterEnabled: true,
            toDate: "2017-05-31",
            toDateFieldType: "date",
        }

        deepFreeze(action);
        deepFreeze(beforeState);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });

    it('should change (on blur) empty input[name="from"] "type" attr from "date" to "text"', () => {
        const action = {
            dateTypeName: "fromDateFieldType",
            dateTypeValue: "text",
            type: "SET_DATE_TYPE",
        };

        const beforeState = {
            fromDate: "",
            fromDateFieldType: "date",
            isDateFilterEnabled: true,
            toDate: "2017-05-31",
            toDateFieldType: "date",
        };

        const afterState = {
            fromDate: "",
            fromDateFieldType: "text",
            isDateFilterEnabled: true,
            toDate: "2017-05-31",
            toDateFieldType: "date",
        }

        deepFreeze(action);
        deepFreeze(beforeState);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });

    it('should change type of "to" field (on focus) from "text" to "date"', () => {
        const action = {
            dateTypeName: "toDateFieldType",
            dateTypeValue: "date",
            type: "SET_DATE_TYPE",
        };

        const beforeState = {
            fromDate: "",
            fromDateFieldType: "text",
            isDateFilterEnabled: true,
            toDate: "",
            toDateFieldType: "text",
        };

        const afterState = {
            fromDate: "",
            fromDateFieldType: "text",
            isDateFilterEnabled: true,
            toDate: "",
            toDateFieldType: "date",
        }

        deepFreeze(action);
        deepFreeze(beforeState);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });

    it('should set "to" date', () => {
        const action = {
            dateFieldName: "toDate",
            dateFieldValue: "2017-05-31",
            type: "SET_DATE",
        };

        const beforeState = {
            fromDate: "2017-05-01",
            fromDateFieldType: "date",
            isDateFilterEnabled: true,
            toDate: "",
            toDateFieldType: "date",
        };

        const afterState = {
            fromDate: "2017-05-01",
            fromDateFieldType: "date",
            isDateFilterEnabled: true,
            toDate: "2017-05-31",
            toDateFieldType: "date",
        }

        deepFreeze(action);
        deepFreeze(beforeState);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });

    it('should set "to" date as empty string', () => {
        const action = {
            dateFieldName: "toDate",
            dateFieldValue: "",
            type: "SET_DATE",
        };

        const beforeState = {
            fromDate: "",
            fromDateFieldType: "text",
            isDateFilterEnabled: true,
            toDate: "2017-05-31",
            toDateFieldType: "date",
        };

        const afterState = {
            fromDate: "",
            fromDateFieldType: "text",
            isDateFilterEnabled: true,
            toDate: "",
            toDateFieldType: "date",
        }

        deepFreeze(action);
        deepFreeze(beforeState);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });

    it('should change (on blur) empty input[name="to"] "type" attr from "date" to "text"', () => {
        const action = {
            dateTypeName: "toDateFieldType",
            dateTypeValue: "text",
            type: "SET_DATE_TYPE",
        };

        const beforeState = {
            fromDate: "",
            fromDateFieldType: "text",
            isDateFilterEnabled: true,
            toDate: "",
            toDateFieldType: "date",
        };

        const afterState = {
            fromDate: "",
            fromDateFieldType: "text",
            isDateFilterEnabled: true,
            toDate: "",
            toDateFieldType: "text",
        }

        deepFreeze(action);
        deepFreeze(beforeState);
        deepFreeze(afterState);

        expect(dateFilter(beforeState, action)).toEqual(afterState);
    });
});