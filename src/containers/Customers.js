import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { CustomersList } from '../components/customers/CustomersList';
import { SearchInput } from '../components/shared/SearchInput';
import { customersActions, customersSelectors } from '../store/customers/index';

@connect(
  (state) => {
    return {
      params: customersSelectors.getParams(state),
      customers: customersSelectors.getCustomers(state)
    };
  }
)
export class Customers extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.handleSearch = this.handleSearch.bind(this, 'title_like');
  }

  componentDidMount() {
    this.fetchCustomers({});
  }

  fetchCustomers(params) {
    this.context.store.dispatch(customersActions.fetchCustomers(params));
  }

  deleteCustomer(customer) {
    this.context.store.dispatch(customersActions.deleteCustomer(customer));
  }

  handleSearch(field, value) {
    this.fetchCustomers({q: value})
  }

  render() {
    const {
      params,
      customers,
    } = this.props;

    return (
      <div>
          <div style={{marginBottom:"15px"}} className="row">
            <div className="col-xs-8">
              <SearchInput
                value={params.q}
                onSearch={this.handleSearch}
                placeholder="search ..."
              />
            </div>
            <div className="col-xs-4">
              <Link to="/customers/new" className="btn btn-primary"><i className="fa fa-plus"></i></Link>
            </div>
        </div> 
        {
          customers.length > 0 && <CustomersList customers={customers} onDelete={this.deleteCustomer}/>
        }
      </div>
    );
  }
}
