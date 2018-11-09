import * as React from 'react';
import { IGrabbing } from '../types';

import { ContentContainer } from '../components/ContentContainer';
import { GrabbingFormEdit } from '../components/GrabbingFormEdit';
import { Author } from './Author';
import { CommentForm } from './CommentForm';
import { TextContent } from './TextContent';
import { Timestamp } from './Timestamp';
import { Title } from './Title';

interface IGrabbingProps extends IGrabbing {
  refreshCallback: () => void;
  refreshGrabbings: () => void;
  currentUserID: number;
}

interface IGrabbingState {
  editing: boolean;
}

export class Grabbing extends React.Component<IGrabbingProps, IGrabbingState> {
  constructor(props: IGrabbingProps) {
    super(props);
    this.state = {
      editing: false,
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({editing: !this.state.editing});
  }

  render() {
    return (
      <ContentContainer
        style={{borderLeft: `0.5rem solid ${this.props.is_hallitus ? 'var(--GREEN)' : '#c0c0c0'}`}}
      >
        {this.state.editing ? (
          <GrabbingFormEdit
            {...this.props}
            hideCallback={() => this.toggle()}
            refreshGrabbings={() => this.props.refreshGrabbings()}
          />
        ) : (
          <>
            <Title>{this.props.title}</Title>
            <Author>{this.props.username}</Author>
            <Timestamp>{this.props.timestamp}</Timestamp>
            {this.props.currentUserID === this.props.userID &&
              <div className="text-author button-arrow" onClick={() => this.toggle()}>
                Muokkaa
              </div>
            }
            <TextContent>{this.props.text}</TextContent>
            <div style={{marginTop: '2rem'}}>
              {this.props.currentUserID > 0 ?
                <CommentForm
                  dropdownText="Kommentoi"
                  parentGrabbingID={this.props.ID}
                  refreshCallback={this.props.refreshCallback}
                />
              :
                <i>Kirjaudu sisään kommentoidaksesi!</i>
              }
            </div>
          </>
        )}
      </ContentContainer>
    );
  }
}