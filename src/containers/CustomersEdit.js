import React from 'react';
import Textarea from 'react-textarea-autosize';

import { 
  customersActions, 
  customersSelectors 
} from '../store/customers/index';

import { connect } from 'react-redux';
import { isEqual } from 'lodash';


@connect(
  (state, props) => {
    return {
      customer: customersSelectors.getCustomer(state, props.params.customerId),
    };
  }
)
export class CustomersEdit extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
  };

  static propTypes = {
    params: React.PropTypes.object,
    customer: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.state,
      customerId: this.props.params.customerId,
      customer: {metadata: '', email: '', description: '', account_balance: ''}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.customer, this.state.customer)) {
      this.setState({...this.state, customer: nextProps.customer});
    }
  }

  componentDidMount() {
    if (this.state.customerId) {
      this.context.store.dispatch(customersActions.fetchCustomer(this.props.params.customerId));
    }
  }

  handleChange(field, e) {
    if(field == 'metadata'){
      
    }
    const customer = Object.assign({}, this.state.customer, {[field]: e.target.value});
    this.setState(Object.assign({}, this.state, {customer}));
  }

  handleSubmit() {
    let formValues = {
      metadata: this.state.customer.metadata, 
      email: this.state.customer.email,
      description: this.state.customer.description,
      id: this.state.customer.id,
    };

    if (this.state.customerId) {
      this.context.store.dispatch(customersActions.updateCustomer(formValues));
    } else {
      this.context.store.dispatch(customersActions.createCustomer(formValues));
    }
  }



  render() {

    // let first_name = this.state.customer.metadata.length>0 ? JSON.parse(this.state.customer.metadata).first_name : "";
    // let last_name = this.state.customer.metadata.length>0 ? JSON.parse(this.state.customer.metadata).last_name : "";

    return (

      <form onSubmit={this.handleSubmit.bind(this)} noValidate>

        <div className="form-group">
          <label className="label-control">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={this.state.customer.metadata}
            onChange={this.handleChange.bind(this, 'metadata')} />
        </div>

        <div className="form-group">
          <label className="label-control">Email</label>
          <input
            type="text"
            className="form-control"
            value={this.state.customer.email}
            onChange={this.handleChange.bind(this, 'email')} />
        </div>

        <div className="form-group">
          <label className="label-control">Balance</label>
          <input
            type="text"
            className="form-control"
            disabled={true}
            value={this.state.customer.account_balance}/>
        </div>

        <div className="form-group">
          <label className="label-control">Description</label>
          <Textarea
            className="form-control"
            value={this.state.customer.description}
            onChange={this.handleChange.bind(this, 'description')} />
        </div>

        <button type="submit" className="btn btn-default">
          {this.state.customerId ? 'Update' : 'Create' } Customer
        </button>
      </form>
      
    );
  }
}
