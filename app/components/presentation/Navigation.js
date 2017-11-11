import React from 'react';
import Tabs, {Tab} from 'material-ui/Tabs';

const Navigation = (props) => {

    const handleOnChange = (event, type) => {
        event.preventDefault();
        let url;
        switch (type) {
            case 'add':
                url = `/bookings/${props.bookingLabel}`;
                break;

            case 'current':
            case 'past':
                url = `/bookings/${props.bookingsLabel}/${type}`;
                break;

            default:
                url = `/bookings/${props.bookingsLabel}/current`;
        }
        if (props.history.location.pathname !== url) {
            props.history.push(url);
        }
    }

    return (
        <Tabs fullWidth centered value={props.isAdd ? 'add' : (props.match.params.current || 'current')} onChange={handleOnChange}>
            <Tab value={'current'} label="Current" href={`/bookings/${props.bookingsLabel}/current`}/>
            <Tab value={'past'} label="Past" href={`/bookings/${props.bookingsLabel}/past`}/>
            <Tab value={'add'} label="Add" href={`/bookings/${props.bookingLabel}`}/>
        </Tabs>
    );
};

export default Navigation;