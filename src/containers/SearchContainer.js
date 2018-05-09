import React from 'react';
import axios from 'axios';
import MusicTable from 'components/Table/MusicTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as playlistActions from '../store/PlayLists';

class SearchContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'data': '',
        };
        this.getSearchList = this.getSearchList.bind(this);
    }

    getSearchList = async () => {
        let { pnum, query } = this.state;
        pnum = pnum === undefined ? 1 : pnum;
        try {
            let result = await axios.get(`http://192.168.0.102:4000/music/search/${query}/${pnum}`);
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

    render() {
        const { list } = this.state.data;
        return (
            <MusicTable data={list} onLoading={false} onAddPlaylist={false} title={`${this.props.match.params.query} 검색결과`} />
        )
    }
}

/*SearchContainer.propTypes = {
    query: React.propTypes.string,
    pnum: React.propTypes.number
}*/

export default connect(
    (state) => ({
        player: state.Player.toJS(),
    }),
    (dispatch) => ({
        PlaylistActions: bindActionCreators(playlistActions, dispatch),
    })
)(SearchContainer); 
