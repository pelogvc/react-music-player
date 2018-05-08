import React from 'react';
import Home from 'components/Home/Home';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playlistActions from '../store/PlayLists';

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            data: '',
        }
        this.getChart = this.getChart.bind(this);

    }
    getChart = async () => {
        let result = await axios.get(`http://192.168.0.102:4000/music/chart`);
        if ( result.status === 200 ) {
            this.setState({
                loading: false,
                data: result.data,
            })
        }
    }

    handleAddPlaylist = async (id) => {

        const { PlaylistActions, player } = this.props;

        // 곡정보
        let result = await axios.get(`http://192.168.0.102:4000/music/info/${id}`);
        // 가사정보
        let lyrics = await axios.get(`http://192.168.0.102:4000/music/lyrics/${id}`);

        let data = Object.assign({id}, result.data, lyrics.data);

        PlaylistActions.create(data);
        player.playfunction(id);
    }

    componentDidMount(){
        this.getChart();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ( this.state !== nextState )
            return true;
        
        return false;
    }

    render() {
        return (
            <div>
                <Home data={this.state.data} onLoading={this.state.loading} onAddPlaylist={this.handleAddPlaylist} />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        player: state.Player.toJS(),
    }),
    (dispatch) => ({
        PlaylistActions: bindActionCreators(playlistActions, dispatch),
    })
)(HomeContainer); 