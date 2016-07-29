import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchOrgs } from '../actions';

class AllOrganizations extends Component {
 
  componentWillMount(){
    this.props.fetchOrgs();
  }

  renderOrganizations(){
      console.log(this.props.organizations)
      return this.props.organizations.map(org => {
        return <div key={org.name}>
          <h3>{org.name}</h3>
          <p>{org.location}</p>
        </div>
      })
  }

  render() {

    return (
      <div> 
        <h2>All Organizations</h2> 
        {this.renderOrganizations()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return { organizations: state.organizations.all }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchOrgs}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrganizations)