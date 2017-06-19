import React from 'react';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../../redux/EventsReducers';
import './eventsList.scss';

class EventsList extends React.Component {

  componentWillMount() {
    this.props.actions.retrieveEvents();
    this.setState({ eventsList: this.props.eventsList });
  }

  render() {
    const eventNode = this.props.eventsList.map((item) => {
      return (
        <Link to={'/events/' + item.id} className='list-group-item' key={item.id}>
          <ListGroup>
            <ListGroupItem header={item.name}>{Date(item.date_event)}</ListGroupItem>
          </ListGroup>  
        </Link>
      );
    });

    return (
      <div className='eventsList'>
        <h2>Events</h2>
        {eventNode}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  eventsList: state.eventsList.events
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(eventsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
