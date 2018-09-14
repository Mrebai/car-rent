import React,{Component} from "react";
import {gql} from 'apollo-boost'
import { Query } from "react-apollo";
import RouteIndex from "./routes/"

export const userQuery = gql`
    query user{
        user{
            id
            userName
            email
            picture
            
        }
    }
`;

export default  class App extends Component {

    constructor(props) {
        super(props);

    }

    user = ( ) => (
        <Query query={userQuery}>
            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                return (
                    <div>
                        <img src={data.user.picture} alt=""/>
                        {
                            console.log(data)   
                        }
                    </div>
                );
            }}
        </Query>
    );

    render(){
        return (
            <div>
                <RouteIndex/>
            </div>
        )
  }
}

