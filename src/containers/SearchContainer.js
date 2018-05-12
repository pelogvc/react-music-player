import React from 'react';
import axios from 'axios';
import MusicTable from 'components/Table/MusicTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playlistActions from '../store/PlayLists';

class SearchContainer extends React.Component {

    constructor(props) {
        super(props);

        let { pnum, query } = props.match.params;
        this.state = {
            'data': '',
            query,
            pnum,
        };

        this.getSearchList = this.getSearchList.bind(this);
        this.handleAddPlaylist = this.handleAddPlaylist.bind(this);
    }

    getSearchList = async () => {
        let { pnum, query } = this.state;
        pnum = pnum === undefined ? 1 : pnum;
        try {
            let result = await axios.get(`http://127.0.0.1:4000/music/search/${query}/${pnum}`);
            if ( result.status === 200 ) {
                this.setState({
                    data: result.data,
                })
            }
        }catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getSearchList();
    }
    
    
    componentWillReceiveProps(nextProps) {
        let { pnum, query } = nextProps.match.params;
        this.setState({
            query,
            pnum,
        }, function() {
            this.getSearchList();
        });
    }
    

    handleAddPlaylist = async (id) => {
        const { PlaylistActions, play } = this.props;
        
        const info = await Promise.all([
            await axios.get('http://127.0.0.1:4000/music/info/' + id),
            await axios.get('http://127.0.0.1:4000/music/lyrics/' + id),
        ]);

        let data = Object.assign({ id }, info[0].data, info[1].data);

        PlaylistActions.create(data);
        play(id);
    }

    render() {
        const { list } = this.state.data;
        return (
            <MusicTable data={list} onLoading={false} onAddPlaylist={this.handleAddPlaylist} title={`${this.props.match.params.query} 검색결과`} />
        )
    }
} 

/*SearchContainer.propTypes = {
    query: React.propTypes.string,
    pnum: React.propTypes.number
}*/

export default connect(
    (state) => ({
        play: state.Player.toJS().playfunction,
    }),
    (dispatch) => ({
        PlaylistActions: bindActionCreators(playlistActions, dispatch),
    })
)(SearchContainer); 
