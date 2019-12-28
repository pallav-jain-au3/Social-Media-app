import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import Scream from '../components/scream/Scream';
import {Grid} from '@material-ui/core';
import {connect} from 'react-redux';
import {getUserDetails} from '../redux/actions/userActions';
import StaticProfile from '../components/Profile/StaticProfile'


 class user extends Component {
    constructor(){
        super()
        this.state = {
            profile : null, 
            screamIdParam : null
        }
    }
    componentDidMount(){
        const handle = this.props.match.params.handle;
        const screamIdParam = this.props.match.params.screamId
        if(screamIdParam) this.setState({screamIdParam : screamIdParam})
       this.props.getUserDetails(handle);
        axios.get(`https://us-central1-social-media-7f318.cloudfunctions.net/api/user/${handle}`)
        .then(res => {
                 this.setState({
                profile: res.data
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        const {data:{screams, loading}} = this.props;
        const {screamIdParam} = this.state;
        const screamMarkup = loading ? (<p>Loading...</p>):
            screams === null ? (<p>No Screams Posted by user</p>):!screamIdParam ? (
                screams.map(scream => <Scream key = {scream.screamId} scream = {scream}/>)
            ):(
                screams.map(scream =>{
                    if(scream.screamId !== screamIdParam){
                        return <Scream key = {scream.screamId} scream = {scream}/>
                    }
                    else {
                        return <Scream key = {scream.screamId} scream = {scream} openDialog/>
                    }
                })
            )
        
        return (
            
            <Grid container spacing = {10}>
            <Grid item sm = {8} xs = {12}>
            {screamMarkup}
            </Grid>
            <Grid item sm = {4} xs = {12}>
                {this.state.profile == null ? (<p>Loading Profile....</p>) : (
                    <StaticProfile profile = {this.state.profile} />)}
            </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    data:PropTypes.object.isRequired,
    getUserDetails:PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    data : state.data
})

export default connect(mapStateToProps, {getUserDetails})(user)