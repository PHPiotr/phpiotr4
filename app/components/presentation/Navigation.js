import React from 'react';
import Tabs, {Tab} from 'material-ui/Tabs';

const Navigation = (props) => {

    const handleOnChange = (event, type) => {
        event.preventDefault();
        let url;
        switch (type) {
        case 'current':
        case 'past':
            url = `/bookings/${props.bookingsLabel}/${type}`;
            break;

        default:
            url = `/bookings/${props.bookingsLabel}`;
        }
        if (props.history.location.pathname !== url) {
            props.history.push(url);
        }
    };

    return (
        <Tabs style={{marginBottom: '23px'}} fullWidth centered value={props.match.params.current || 'all'} onChange={handleOnChange}>
            <Tab value={'all'} label="All" href={`/bookings/${props.bookingsLabel}`}/>
            <Tab value={'current'} label="Current" href={`/bookings/${props.bookingsLabel}/current`}/>
            <Tab value={'past'} label="Past" href={`/bookings/${props.bookingsLabel}/past`}/>
        </Tabs>
    );
};

export default Navigation;