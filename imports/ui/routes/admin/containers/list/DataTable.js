import React from 'react';
import { Table } from 'reactstrap';

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      variable: [],
    };
  }

  componentDidMount() {
    React.Children.forEach(this.props.children, (element) => {
      if (!React.isValidElement(element)) return;

      const { source } = element.props;
      const oldsState = this.state.variable;
      oldsState.push(source);
      this.setState({ variable: oldsState });
    });
  }

  render() {
    const data = [{
      id: 1,
      name: 'ra3',
      age: 24,
    }, {
      id: 2,
      name: 'ra3',
      age: 24,
    }, {
      id: 3,
      name: 'ra3',
      age: 24,
    }, {
      id: 4,
      name: 'ra3',
      age: 24,
    }];
    return (
      <Table hover responsive>
        {
              console.log(this.state.variable)
          }
        <thead>
          <tr>
            {

                this.state.variable.map((item, i) => (
                  <th key={i}>
                    {item}
                    {' '}
                  </th>
                ))
            }
          </tr>
        </thead>

        <tbody>
          {
            (data.map((data) => {
              const result = React.Children.map(this.props.children, child => React.cloneElement(child, { data: data[child.props.source] }));
              return (
                <tr key={data.id}>
                  {result}
                </tr>
              );
            }))
          }
        </tbody>
      </Table>
    );
  }
}
