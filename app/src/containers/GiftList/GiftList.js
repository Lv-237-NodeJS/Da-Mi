import React from 'react';
import { Accordion, Panel, Button, ButtonToolbar, Image } from 'react-bootstrap';
import { EditGift } from 'src/containers';
import './giftList.scss';

export default class GiftList extends React.Component {
  render() {
    const giftNode = this.props.gifts.map((gift, id) => {

      const handleDelete = e => {
        e.preventDefault();
        this.props.actions.deleteGift(this.props.id, gift.id);
      };

      return (
        <Panel header={gift.name} eventKey={gift.id} key={gift.id}>
          {!!gift.image &&
            <div className='gift-image' style={{backgroundImage: `url(${gift.image})`}}>
          </div>}
          <div className='desc-block'> 
            <p><span className='gift-caption'>Description:</span>{gift.description}</p>
              {!!gift.link && <p><span className='gift-caption'>Link:</span>
              <a href={gift.link} target='_blank'>link to present</a>
            </p>}
            <ButtonToolbar>
              <EditGift id={this.props.id} gift={gift} actions={this.props.actions}/>
              <Button bsStyle='danger' bsSize='small' onClick={handleDelete}>
                Delete
              </Button>
              {gift.is_available === true &&
              <Button bsStyle='success' bsSize='small'>Choose</Button>}
            </ButtonToolbar>
          </div>
        </Panel>
      );
    });

    return (
      <Accordion>
        {giftNode}
      </Accordion>
    );
  }
}
